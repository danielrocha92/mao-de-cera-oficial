import * as admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';

const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT;
let serviceAccount;

if (serviceAccountString) {
  // Para produção/Vercel, usa a variável de ambiente
  try {
    serviceAccount = JSON.parse(serviceAccountString);
  } catch (e) {
    console.error('Erro ao fazer parse do JSON da service account:', e.message);
    throw new Error('Formato inválido para FIREBASE_SERVICE_ACCOUNT.');
  }
} else {
  // Para desenvolvimento local, lê o arquivo diretamente
  try {
    const filePath = path.resolve(process.cwd(), 'mao-de-cera-oficial-firebase-adminsdk-fbsvc-c68ab8b2d0.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    serviceAccount = JSON.parse(fileContent);
  } catch (error) {
    console.error('Erro ao ler ou fazer parse do arquivo da service account:', error);
    throw new Error('Não foi possível carregar as credenciais da service account do Firebase para desenvolvimento local.');
  }
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const adminAuth = admin.auth();
const db = admin.firestore();

export { adminAuth, db };
