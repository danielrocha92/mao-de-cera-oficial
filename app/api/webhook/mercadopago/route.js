import { NextResponse } from 'next/server';
import { payment } from '@/lib/mercadopago';
import { db } from '@/lib/firebaseAdmin';
import { sendEmailServer } from '@/lib/emailjsServer';

export async function POST(request) {
  try {
    const url = new URL(request.url);
    const topic = url.searchParams.get('topic') || url.searchParams.get('type');
    const id = url.searchParams.get('id') || url.searchParams.get('data.id');

    if (topic === 'payment') {
      const paymentData = await payment.get({ id });

      // Atualiza o pedido no Firestore
      // Precisamos saber qual pedido é. Geralmente passamos o ID do pedido no external_reference da preference
      // ou buscamos pelo ID do pagamento se salvamos antes.
      // Aqui vamos assumir que o external_reference é o ID do pedido.

      const orderId = paymentData.external_reference;
      const status = paymentData.status;

      if (orderId) {
        await db.collection('pedidos').doc(orderId).update({
          status: status === 'approved' ? 'pago' : status,
          id_pagamento: id,
          updatedAt: new Date().toISOString(),
        });

        // Se aprovado, dispara emissão de NF-e e envia email
        if (status === 'approved') {
            const emailParams = {
                id_do_pedido: orderId,
                data_da_compra: new Date(paymentData.date_approved || new Date()).toLocaleString('pt-BR'),
                valor_total: paymentData.transaction_amount ? paymentData.transaction_amount.toFixed(2) : '0.00',
                forma_pagamento: paymentData.payment_method_id || 'Não informado',
                to_email: paymentData.payer?.email // Assuming template has a 'to_email' field or similar
            };

            await sendEmailServer(emailParams);
        }
      }
    }

    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error('Erro no webhook MP:', error);
    return NextResponse.json({ error: 'Erro no webhook' }, { status: 500 });
  }
}
