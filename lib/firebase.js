import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
// Initialize Firebase
let app;
let auth;
let db;

if (!firebaseConfig.apiKey) {
  console.warn('Firebase API key missing. Using mock for build.');
  app = {};
  auth = {
    currentUser: null,
    onAuthStateChanged: (cb) => { cb(null); return () => {}; },
    signInWithEmailAndPassword: () => Promise.reject(new Error('Mock Auth')),
    signOut: () => Promise.resolve(),
    getIdTokenResult: () => Promise.resolve({ claims: {} }),
  };
  db = {
    collection: () => ({
      doc: () => ({
        get: () => Promise.resolve({ exists: () => false, data: () => ({}) }),
        set: () => Promise.resolve(),
        update: () => Promise.resolve(),
        onSnapshot: () => () => {},
      }),
      add: () => Promise.resolve({ id: 'mock-id' }),
      where: () => ({
        get: () => Promise.resolve({ docs: [] }),
        onSnapshot: () => () => {},
      }),
    }),
  };
} else {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  auth = getAuth(app);
  db = getFirestore(app);
}

export { auth, db };
export default app;
