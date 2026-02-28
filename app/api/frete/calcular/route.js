import { NextResponse } from 'next/server';
import { getShippingQuote } from '@/lib/bling';

export async function POST(request) {
  try {
    const { cep, itens } = await request.json();

    // Chama o helper do Bling (ou Correios)
    // const quote = await getShippingQuote(cep, itens);

    // Mock de resposta (baseado na imagem do usuário)
    const quote = [
      { nome: 'Correios SEDEX', valor: 11.24, prazo: 3 },
      { nome: 'Jadlog Rápido', valor: 14.26, prazo: 6 },
      { nome: 'Jadlog Econômico', valor: 11.37, prazo: 9 },
      { nome: 'Correios PAC', valor: 18.61, prazo: 9 }
    ];

    return NextResponse.json(quote);
  } catch (error) {
    console.error('Erro ao calcular frete:', error);
    return NextResponse.json({ error: 'Erro ao calcular frete' }, { status: 500 });
  }
}
