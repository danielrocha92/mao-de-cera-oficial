// lib/firebaseAdmin.js
import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import path from 'path';

// Encontra o caminho para a chave (presume que está na raiz do projeto)
const serviceAccountPath = path.resolve('./serviceAccountKey.json');

// Lê o arquivo JSON
const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));

// Inicializa o app Admin (apenas se não foi inicializado)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const adminAuth = admin.auth();
const adminDb = admin.firestore();

export { adminAuth, adminDb };