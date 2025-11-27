import { NextResponse } from 'next/server';
import { createNFe } from '@/lib/bling';
import { db } from '@/lib/firebaseAdmin';

export async function POST(request) {
  try {
    const { pedidoId } = await request.json();

    const pedidoDoc = await db.collection('pedidos').doc(pedidoId).get();
    if (!pedidoDoc.exists) {
      return NextResponse.json({ error: 'Pedido não encontrado' }, { status: 404 });
    }

    const pedido = pedidoDoc.data();

    // Chama o helper do Bling
    const nfe = await createNFe(pedido);

    // Atualiza pedido com dados da NF-e (mockado por enquanto pois createNFe é placeholder)
    await db.collection('pedidos').doc(pedidoId).update({
      id_nfe: 'pendente-bling', // nfe.id
      status: 'processando_nfe'
    });

    return NextResponse.json({ message: 'Solicitação de NF-e enviada' });
  } catch (error) {
    console.error('Erro ao emitir NF-e:', error);
    return NextResponse.json({ error: 'Erro ao emitir NF-e' }, { status: 500 });
  }
}
