import { NextResponse } from 'next/server';
import { createPaymentPreference } from '@/lib/mercadopago';

export async function POST(request) {
  const { items, payer } = await request.json();
  
  // TODO: Format the preference data according to Mercado Pago's documentation
  const preferenceData = {
    items: items, // e.g., [{ title: 'Meu produto', unit_price: 100, quantity: 1 }]
    payer: payer,
    back_urls: {
      success: `${request.nextUrl.origin}/compra-aprovada`,
      failure: `${request.nextUrl.origin}/compra-falhou`,
      pending: `${request.nextUrl.origin}/compra-pendente`,
    },
    auto_return: 'approved',
    notification_url: `${request.nextUrl.origin}/api/webhook/mercadopago`,
  };

  try {
    const preference = await createPaymentPreference(preferenceData);
    // Return the sandbox_init_point or init_point to the frontend
    return NextResponse.json({ id: preference.id, init_point: preference.init_point });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create payment preference' }, { status: 500 });
  }
}
