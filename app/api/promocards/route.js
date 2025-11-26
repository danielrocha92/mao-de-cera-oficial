import { NextResponse } from 'next/server';
import { db, admin } from '../../../lib/firebaseAdmin';

// GET all promotional cards
export async function GET(request) {
  try {
    const promoCardsSnapshot = await db.collection('promocards').get();
    const promoCards = promoCardsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json(promoCards);
  } catch (error) {
    console.error("Error fetching promotional cards:", error);
    return NextResponse.json({ error: "Failed to fetch promotional cards" }, { status: 500 });
  }
}

// CREATE a new promotional card
export async function POST(request) {
  try {
    const body = await request.json();
    // Basic validation
    if (!body.title || !body.image || !body.link) {
      return NextResponse.json({ error: 'Missing required fields: title, image, link' }, { status: 400 });
    }

    const newPromoCard = {
      title: body.title,
      image: body.image,
      link: body.link,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };
    const docRef = await db.collection('promocards').add(newPromoCard);
    return NextResponse.json({ message: "Promotional card created successfully", id: docRef.id }, { status: 201 });
  } catch (error) {
    console.error("Error creating promotional card:", error);
    return NextResponse.json({ error: "Failed to create promotional card" }, { status: 500 });
  }
}