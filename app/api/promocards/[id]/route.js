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

// UPDATE a promotional card
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();

    // Basic validation
    if (!body.title || !body.image || !body.link) {
      return NextResponse.json({ error: 'Missing required fields: title, image, link' }, { status: 400 });
    }

    const promoCardRef = db.collection('promocards').doc(id);
    await promoCardRef.update({
      title: body.title,
      image: body.image,
      link: body.link,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return NextResponse.json({ message: "Promotional card updated successfully" }, { status: 200 });
  } catch (error) {
    console.error(`Error updating promotional card with ID ${params.id}:`, error);
    return NextResponse.json({ error: "Failed to update promotional card" }, { status: 500 });
  }
}

// DELETE a promotional card
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const promoCardRef = db.collection('promocards').doc(id);
    await promoCardRef.delete();
    return NextResponse.json({ message: "Promotional card deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error(`Error deleting promotional card with ID ${params.id}:`, error);
    return NextResponse.json({ error: "Failed to delete promotional card" }, { status: 500 });
  }
}