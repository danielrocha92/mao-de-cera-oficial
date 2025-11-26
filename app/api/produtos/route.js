import { NextResponse } from 'next/server';
import { db } from '@/lib/firebaseAdmin';

// CREATE a new product
export async function POST(request) {
  try {
    const body = await request.json();
    const newProduct = {
      ...body,
      createdAt: new Date().toISOString(),
    };
    const docRef = await db.collection('produtos').add(newProduct);
    return NextResponse.json({ id: docRef.id, ...newProduct }, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    return NextResponse.json({ error: 'Erro ao criar produto' }, { status: 500 });
  }
}

// GET all products
export async function GET() {
  try {
    const productsSnapshot = await db.collection('produtos').get();
    const products = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return NextResponse.json({ error: 'Erro ao buscar produtos' }, { status: 500 });
  }
}
