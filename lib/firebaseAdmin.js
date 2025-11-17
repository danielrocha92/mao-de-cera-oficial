import * as admin from 'firebase-admin';

// 1. Pega a STRING JSON da variável de ambiente que você criou na Vercel
const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT;

// 2. Verificação de erro (boa prática)
if (!serviceAccountString) {
  // Este erro é importante para você saber se esqueceu de colocar a variável na Vercel
  throw new Error('A variável de ambiente FIREBASE_SERVICE_ACCOUNT não está definida.');
}

// 3. Converte a string de volta para um objeto JSON
let serviceAccount;
try {
  serviceAccount = JSON.parse(serviceAccountString);
} catch (e) {
  console.error('Erro ao fazer parse do JSON da service account:', e.message);
  throw new Error('Formato inválido para FIREBASE_SERVICE_ACCOUNT.');
}

// 4. Inicializa o Firebase Admin (com verificação para evitar re-inicialização)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

// ... continue com o resto do seu código da API (POST, GET, etc.)
// export async function POST(request) { ... }
