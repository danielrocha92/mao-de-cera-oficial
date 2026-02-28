import { NextResponse } from 'next/server';
import { db } from '@/lib/firebaseAdmin';

export const dynamic = 'force-dynamic';

// GET all categories
export async function GET() {
  try {
    const snapshot = await db.collection('categorias').get();
    const categorias = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json(categorias, { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    return NextResponse.json({ error: 'Erro ao buscar categorias' }, { status: 500 });
  }
}

// CREATE a new category
export async function POST(request) {
  try {
    const body = await request.json();
    const newCategory = {
      ...body,
      createdAt: new Date().toISOString(),
    };
    const docRef = await db.collection('categorias').add(newCategory);
    return NextResponse.json({ id: docRef.id, ...newCategory }, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar categoria:', error);
    return NextResponse.json({ error: 'Erro ao criar categoria' }, { status: 500 });
  }
}
