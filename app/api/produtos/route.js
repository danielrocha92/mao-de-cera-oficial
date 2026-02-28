import { NextResponse } from 'next/server';
import { db } from '@/lib/firebaseAdmin';

export const dynamic = 'force-dynamic';

// CREATE a new product
export async function POST(request) {
  try {
    const body = await request.json();

    // Sanitize slug precisely
    let safeSlug = body.slug || '';
    if (safeSlug.includes('http')) {
      const parts = safeSlug.split('/').filter(Boolean);
      safeSlug = parts[parts.length - 1] || '';
    }
    safeSlug = safeSlug.toString().toLowerCase()
      .trim()
      .replace(/\s+/g, '-')     // replace spaces with -
      .replace(/[^\w\-]+/g, '') // remove non-words
      .replace(/\-\-+/g, '-')   // replace multiple - with single -
      .replace(/^-+/, '')       // trim - from start
      .replace(/-+$/, '');      // trim - from end

    const newProduct = {
      ...body,
      slug: safeSlug || body.sku || 'produto-sem-slug',
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
