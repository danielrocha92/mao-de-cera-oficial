import { NextResponse } from 'next/server';
import { db } from '@/lib/firebaseAdmin';
import PaymentRouter from '@/lib/payments/PaymentRouter.js';
import AsaasStrategy from '@/lib/payments/strategies/AsaasStrategy.js';
import MercadoPagoStrategy from '@/lib/payments/strategies/MercadoPagoStrategy.js';
import PagarMeStrategy from '@/lib/payments/strategies/PagarMeStrategy.js';

export async function POST(request) {
  try {
    const payload = await request.json();
    const { paymentMethod, payer, creditCard } = payload;

    // 1) Lógica para Pix
    if (paymentMethod === 'pix') {
      const pixRouter = new PaymentRouter(new AsaasStrategy());
      const pixResult = await pixRouter.processPix(payload);

      if (pixResult.success) {
        // Calcula o total baseado nos itens e um provavel desconto de pix ou frete (simplificado para o MVP)
        const total = payload.items.reduce((acc, item) => acc + (parseFloat(item.preco) * parseInt(item.quantity)), 0) * 0.95;

        // Salvar pedido no Firebase
        await db.collection('pedidos').add({
          clienteId: payer.uid || 'convidado',
          clienteEmail: payer.email,
          clienteNome: payer.nome,
          items: payload.items,
          total: total,
          metodoPagamento: 'pix',
          status: 'pendente', // Transação Pix aguarda pagamento
          gateway: pixResult.gateway || 'Asaas',
          transactionId: pixResult.transactionId || 'PENDING',
          createdAt: new Date().toISOString()
        });
      }

      return NextResponse.json(pixResult);
    }

    // 2) Lógica para Cartão de Crédito
    if (paymentMethod === 'credit-card') {
      // Instancia o gateway primário (ex: MercadoPago) e a estratégia de Fallback
      const ccRouter = new PaymentRouter(new MercadoPagoStrategy());
      const fallbackStrategy = new PagarMeStrategy();

      console.log(`[API Checkout] Iniciando Roteamento Cartão Crédito para ${payer.nome}`);

      const res = await ccRouter.processCreditCardWithFallback(
        creditCard,
        fallbackStrategy
      );

      if (res.success) {
        const total = payload.items.reduce((acc, item) => acc + (parseFloat(item.preco) * parseInt(item.quantity)), 0);

        await db.collection('pedidos').add({
          clienteId: payer.uid || 'convidado',
          clienteEmail: payer.email,
          clienteNome: payer.nome,
          items: payload.items,
          total: total,
          metodoPagamento: 'credit-card',
          status: 'pago', // Cartão de crédito geralmente é aprovado na hora
          gateway: res.gateway || 'MercadoPago/PagarMe',
          transactionId: res.transactionId || 'APPROVED',
          createdAt: new Date().toISOString()
        });
      }

      return NextResponse.json(res);
    }

    return NextResponse.json({ error: 'Método de pagamento inválido.' }, { status: 400 });
  } catch (error) {
    console.error('Erro na API de Checkout Roteada:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
