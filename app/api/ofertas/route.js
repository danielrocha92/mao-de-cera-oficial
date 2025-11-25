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

// GET all offers
export async function GET(request) {
  try {
    const offersSnapshot = await db.collection('ofertas').orderBy('createdAt', 'desc').get();
    const offers = offersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json(offers);
  } catch (error) {
    console.error("Error fetching offers:", error);
    return NextResponse.json({ error: "Failed to fetch offers" }, { status: 500 });
  }
}

// CREATE a new offer
export async function POST(request) {
  try {
    const body = await request.json();
    // A simple validation
    if (!body.name || !body.image || !body.link) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newOffer = {
      name: body.name,
      image: body.image,
      link: body.link,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };
    const docRef = await db.collection('ofertas').add(newOffer);
    return NextResponse.json({ message: "Offer created successfully", id: docRef.id }, { status: 201 });
  } catch (error) {
    console.error("Error creating offer:", error);
    return NextResponse.json({ error: "Failed to create offer" }, { status: 500 });
  }
}
