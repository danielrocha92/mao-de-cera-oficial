import admin from 'firebase-admin';

if (!admin.apps.length) {
  try {
    if (process.env.FIREBASE_PRIVATE_KEY) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        }),
      });
      console.log('Firebase Admin initialized successfully');
    } else {
      console.warn('FIREBASE_PRIVATE_KEY not found, skipping Firebase Admin initialization.');
    }
  } catch (error) {
    console.error('Firebase Admin initialization error', error.stack);
  }
}

export const db = admin.apps.length ? admin.firestore() : {
  collection: () => ({
    doc: () => ({
      get: () => Promise.resolve({ exists: false }),
      set: () => Promise.resolve(),
      update: () => Promise.resolve(),
      delete: () => Promise.resolve()
    }),
    limit: () => ({
      get: () => Promise.resolve({ docs: [] })
    }),
    where: () => ({
      get: () => Promise.resolve({ docs: [] }),
      limit: () => ({ get: () => Promise.resolve({ docs: [] }) })
    }),
    get: () => Promise.resolve({ docs: [] }),
    add: () => Promise.resolve({ id: 'mock-id' })
  })
}; // Mock to prevent build crash
export const auth = admin.apps.length ? admin.auth() : { createUser: () => Promise.resolve({}) };
export const adminAuth = auth;
export { admin };
export default admin;
