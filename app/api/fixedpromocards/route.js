import { NextResponse } from 'next/server';
import { db, admin } from '../../../lib/firebaseAdmin';

const collectionName = 'fixedPromoCards';

// GET all fixed promotional cards
export async function GET(request) {
  try {
    const fixedPromoCardsSnapshot = await db.collection(collectionName).orderBy('order').get();
    const fixedPromoCards = fixedPromoCardsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json(fixedPromoCards);
  } catch (error) {
    console.error("Error fetching fixed promotional cards:", error);
    return NextResponse.json({ error: "Failed to fetch fixed promotional cards" }, { status: 500 });
  }
}

// CREATE a new fixed promotional card
export async function POST(request) {
  try {
    const body = await request.json();
    // Basic validation
    if (!body.title || !body.description || !body.image || !body.link || body.order === undefined) {
      return NextResponse.json({ error: 'Missing required fields: title, description, image, link, order' }, { status: 400 });
    }

    const newFixedPromoCard = {
      title: body.title,
      description: body.description,
      image: body.image,
      link: body.link,
      order: body.order,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      lastModifiedAt: admin.firestore.FieldValue.serverTimestamp(),
    };
    const docRef = await db.collection(collectionName).add(newFixedPromoCard);
    return NextResponse.json({ message: "Fixed promotional card created successfully", id: docRef.id }, { status: 201 });
  } catch (error) {
    console.error("Error creating fixed promotional card:", error);
    return NextResponse.json({ error: "Failed to create fixed promotional card" }, { status: 500 });
  }
}

// UPDATE a fixed promotional card
export async function PUT(request) {
  try {
    const { id, ...updates } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'Missing document ID for update' }, { status: 400 });
    }

    // Ensure lastModifiedAt is updated
    updates.lastModifiedAt = admin.firestore.FieldValue.serverTimestamp();

    await db.collection(collectionName).doc(id).update(updates);
    return NextResponse.json({ message: "Fixed promotional card updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error updating fixed promotional card:", error);
    return NextResponse.json({ error: "Failed to update fixed promotional card" }, { status: 500 });
  }
}

// DELETE a fixed promotional card
export async function DELETE(request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'Missing document ID for deletion' }, { status: 400 });
    }

    await db.collection(collectionName).doc(id).delete();
    return NextResponse.json({ message: "Fixed promotional card deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting fixed promotional card:", error);
    return NextResponse.json({ error: "Failed to delete fixed promotional card" }, { status: 500 });
  }

}
