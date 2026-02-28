import { NextResponse } from 'next/server';
import { db } from '@/lib/firebaseAdmin';

// CREATE a new banner
export async function POST(request) {
  try {
    const body = await request.json();
    const newBanner = {
      ...body,
      createdAt: new Date().toISOString(),
    };
    const docRef = await db.collection('banners').add(newBanner);
    return NextResponse.json({ id: docRef.id, ...newBanner }, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar banner:', error);
    return NextResponse.json({ error: 'Erro ao criar banner', details: error.message }, { status: 500 });
  }
}

// GET all banners
export async function GET() {
  try {
    const bannersSnapshot = await db.collection('banners').get();
    const banners = bannersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json(banners, { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar banners:', error);
    return NextResponse.json({ error: 'Erro ao buscar banners' }, { status: 500 });
  }
}
