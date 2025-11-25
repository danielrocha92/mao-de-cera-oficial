import { NextResponse } from 'next/server';
import * as admin from 'firebase-admin';

// Initialize Firebase Admin if not already initialized
if (!admin.apps.length) {
  const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!serviceAccountString) {
    throw new Error('The FIREBASE_SERVICE_ACCOUNT environment variable is not defined.');
  }
  try {
    const serviceAccount = JSON.parse(serviceAccountString);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (e) {
    console.error('Error initializing Firebase Admin:', e.message);
    throw new Error('Could not initialize Firebase Admin.');
  }
}

const db = admin.firestore();

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