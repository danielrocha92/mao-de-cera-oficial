import { NextResponse } from 'next/server';
import { db } from '@/lib/firebaseAdmin';

// GET banner by ID
export async function GET(request, { params }) {
  try {
    const { id } = params;
    const doc = await db.collection('banners').doc(id).get();

    if (!doc.exists) {
      return NextResponse.json({ error: 'Banner não encontrado' }, { status: 404 });
    }

    return NextResponse.json({ id: doc.id, ...doc.data() }, { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar banner:', error);
    return NextResponse.json({ error: 'Erro interno ao buscar banner' }, { status: 500 });
  }
}

// UPDATE banner by ID
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();

    const bannerRef = db.collection('banners').doc(id);
    await bannerRef.update({
      ...body,
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json({ message: 'Banner atualizado com sucesso' }, { status: 200 });
  } catch (error) {
    console.error('Erro ao atualizar banner:', error);
    return NextResponse.json({ error: 'Erro interno ao atualizar banner' }, { status: 500 });
  }
}

// DELETE banner by ID
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    await db.collection('banners').doc(id).delete();
    return NextResponse.json({ message: 'Banner excluído com sucesso' }, { status: 200 });
  } catch (error) {
    console.error('Erro ao excluir banner:', error);
    return NextResponse.json({ error: 'Erro interno ao excluir banner' }, { status: 500 });
  }
}
