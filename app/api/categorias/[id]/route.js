import { NextResponse } from 'next/server';
import { db } from '@/lib/firebaseAdmin';

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    await db.collection('categorias').doc(id).delete();
    return NextResponse.json({ message: 'Categoria excluída com sucesso' }, { status: 200 });
  } catch (error) {
    console.error('Erro ao excluir categoria:', error);
    return NextResponse.json({ error: 'Erro ao excluir categoria' }, { status: 500 });
  }
}
