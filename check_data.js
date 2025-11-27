require('dotenv').config({ path: '.env.local' });
const admin = require('firebase-admin');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    })
  });
}

const db = admin.firestore();

async function checkProducts() {
  try {
    const snapshot = await db.collection('produtos').limit(1).get();
    if (snapshot.empty) {
      console.log('No products found.');
      return;
    }
    snapshot.forEach(doc => {
      console.log('Product ID:', doc.id);
      console.log('Data:', JSON.stringify(doc.data(), null, 2));
    });
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

checkProducts();
