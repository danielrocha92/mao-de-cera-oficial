import { NextResponse } from 'next/server';
import { getShippingQuote } from '@/lib/bling';

export async function POST(request) {
  try {
    const { cep, itens } = await request.json();

    // Chama o helper do Bling (ou Correios)
    // const quote = await getShippingQuote(cep, itens);

    // Mock de resposta
    const quote = [
      { nome: 'PAC', valor: 25.00, prazo: 5 },
      { nome: 'SEDEX', valor: 45.00, prazo: 2 }
    ];

    return NextResponse.json(quote);
  } catch (error) {
    console.error('Erro ao calcular frete:', error);
    return NextResponse.json({ error: 'Erro ao calcular frete' }, { status: 500 });
  }
}
