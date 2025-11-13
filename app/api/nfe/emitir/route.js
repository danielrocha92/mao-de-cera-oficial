import { NextResponse } from 'next/server';
import { emitirNFeBling } from '@/lib/bling';
// import { adminDb } from '@/lib/firebaseAdmin';

export async function POST(request) {
  const { pedidoId } = await request.json();

  if (!pedidoId) {
    return NextResponse.json({ error: 'pedidoId is required' }, { status: 400 });
  }

  try {
    // 1. Fetch the order from Firestore
    // const orderDoc = await adminDb.collection('pedidos').doc(pedidoId).get();
    // if (!orderDoc.exists) {
    //   return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    // }
    // const orderData = orderDoc.data();

    // 2. Format data for Bling's API (this is complex and requires careful mapping)
    const blingOrderData = {
      // ... map fields from orderData to what Bling expects
    };

    // 3. Call the Bling helper to send the NFe request
    // const nfeResponse = await emitirNFeBling(blingOrderData);

    // 4. Update the order in Firestore with the NFe status/ID
    // await adminDb.collection('pedidos').doc(pedidoId).update({
    //   status_nfe: nfeResponse.status,
    //   id_nfe: nfeResponse.id,
    // });

    console.log(`NFe emission process triggered for order: ${pedidoId}`);
    
    // Placeholder response
    return NextResponse.json({ message: 'NFe emission process started', pedidoId: pedidoId });

  } catch (error) {
    console.error('Failed to emit NFe:', error);
    return NextResponse.json({ error: 'Failed to emit NFe' }, { status: 500 });
  }
}
