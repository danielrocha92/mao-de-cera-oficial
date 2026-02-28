import { NextResponse } from 'next/server';
import { db } from '@/lib/firebaseAdmin';

export async function GET(request, { params }) {
  try {
    const { id } = params;
    if (!id) {
      return NextResponse.json({ error: 'ID do produto não fornecido' }, { status: 400 });
    }

    const doc = await db.collection('produtos').doc(id).get();

    if (!doc.exists) {
      return NextResponse.json({ error: 'Produto não encontrado' }, { status: 404 });
    }

    return NextResponse.json({ id: doc.id, ...doc.data() }, { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    return NextResponse.json({ error: 'Erro ao buscar produto' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
    try {
        const { id } = params;
        if (!id) {
            return NextResponse.json({ error: 'ID do produto não fornecido' }, { status: 400 });
        }

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

        const updatedProduct = {
            ...body,
            slug: safeSlug || body.sku || body.id || 'produto-sem-slug',
            updatedAt: new Date().toISOString(),
        };

        await db.collection('produtos').doc(id).update(updatedProduct);

        return NextResponse.json({ id, ...updatedProduct }, { status: 200 });
    } catch (error) {
        console.error('Erro ao atualizar produto:', error);
        return NextResponse.json({ error: 'Erro ao atualizar produto' }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    if (!id) {
      return NextResponse.json({ error: 'ID do produto não fornecido' }, { status: 400 });
    }

    await db.collection('produtos').doc(id).delete();

    return NextResponse.json({ message: 'Produto excluído com sucesso' }, { status: 200 });
  } catch (error) {
    console.error('Erro ao excluir produto:', error);
    return NextResponse.json({ error: 'Erro ao excluir produto' }, { status: 500 });
  }
}