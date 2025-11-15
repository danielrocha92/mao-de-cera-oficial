// Este script define uma custom claim de administrador para um usuário do Firebase.
// Uso: node scripts/setAdmin.js <emailDoUsuario>

import { adminAuth } from '../lib/firebaseAdmin.js';

async function setAdminClaim(email) {
  if (!email) {
    console.error('Erro: Forneça o e-mail do usuário como argumento.');
    process.exit(1);
  }

  try {
    // Encontra o usuário pelo e-mail
    const user = await adminAuth.getUserByEmail(email);

    // Define a custom claim { admin: true }
    await adminAuth.setCustomUserClaims(user.uid, { admin: true });

    console.log(`Sucesso! A claim de administrador foi definida para o usuário: ${email}`);
    console.log('Pode levar alguns instantes para a claim ser propagada.');
    
    // Verifica se a claim foi aplicada
    const updatedUser = await adminAuth.getUser(user.uid);
    console.log('Claims atuais:', updatedUser.customClaims);

  } catch (error) {
    console.error(`Erro ao definir a claim de administrador para ${email}:`, error);
    process.exit(1);
  }
}

// Pega o e-mail do argumento da linha de comando
const email = process.argv[2];
setAdminClaim(email);
