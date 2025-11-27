import { NextResponse } from 'next/server';
import { preference } from '@/lib/mercadopago';

export async function POST(request) {
  try {
    const { items, payer } = await request.json();

    const result = await preference.create({
      body: {
        items: items.map(item => ({
          id: item.id,
          title: item.nome,
          quantity: Number(item.quantity),
          unit_price: Number(item.preco),
          currency_id: 'BRL',
        })),
        payer: {
          email: payer.email,
          name: payer.nome,
          identification: {
            type: 'CPF',
            number: payer.cpf,
          },
        },
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/sucesso`,
          failure: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/erro`,
          pending: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/pendente`,
        },
        auto_return: 'approved',
        notification_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/webhook/mercadopago`,
      }
    });

    return NextResponse.json({ url: result.init_point, id: result.id });
  } catch (error) {
    console.error('Erro ao criar preferência MP:', error);
    return NextResponse.json({ error: 'Erro ao processar pagamento' }, { status: 500 });
  }
}
