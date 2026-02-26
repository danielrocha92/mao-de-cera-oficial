import { NextResponse } from 'next/server';
import { db } from '@/lib/firebaseAdmin';

export async function GET() {
  try {
    const docRef = db.collection('configuracoes').doc('loja');
    const docSnap = await docRef.get();

    if (docSnap.exists) {
      return NextResponse.json(docSnap.data(), { status: 200 });
    } else {
      return NextResponse.json({}, { status: 200 });
    }
  } catch (error) {
    console.error('Erro ao buscar configurações:', error);
    return NextResponse.json({ error: 'Erro ao buscar configurações' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const docRef = db.collection('configuracoes').doc('loja');

    // Set operation overrides the document entirely, or merges if merge: true. We use set with merge: true to avoid losing info.
    await docRef.set(data, { merge: true });

    return NextResponse.json({ success: true, message: 'Configurações atualizadas' }, { status: 200 });
  } catch (error) {
    console.error('Erro ao salvar configurações:', error);
    return NextResponse.json({ error: 'Erro ao salvar configurações' }, { status: 500 });
  }
}
