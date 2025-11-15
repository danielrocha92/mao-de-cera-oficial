import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBnnTiUm1zuW_ERgxsrFUc6PWlncyXOOqE",
  authDomain: "mao-de-cera-oficial.firebaseapp.com",
  projectId: "mao-de-cera-oficial",
  storageBucket: "mao-de-cera-oficial.appspot.com",
  messagingSenderId: "825390939834",
  appId: "1:825390939834:web:9555fdc1cfe64d59034c83",
  measurementId: "G-N2J2D1M919"
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
