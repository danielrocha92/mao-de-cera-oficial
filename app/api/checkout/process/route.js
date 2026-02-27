import { NextResponse } from 'next/server';
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

      return NextResponse.json(res);
    }

    return NextResponse.json({ error: 'Método de pagamento inválido.' }, { status: 400 });
  } catch (error) {
    console.error('Erro na API de Checkout Roteada:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
