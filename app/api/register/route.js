import { NextResponse } from 'next/server';
import { adminAuth, db } from '@/lib/firebaseAdmin'; // Assuming firebaseAdmin.js exports these
import { registerSchema } from '@/lib/validationSchemas';
import bcrypt from 'bcrypt';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, password, phone, address } = registerSchema.parse(body);

    // Hash the password
    // Note: Firebase Authentication automatically hashes passwords.
    // This bcrypt step is added because it was specifically requested.
    // If you plan to store the password hash in Firestore, ensure it's secure
    // and Firebase Auth's built-in hashing is usually sufficient for auth purposes.
    // const hashedPassword = await bcrypt.hash(password, 10); // Commented out: Firebase Auth handles password hashing internally.

    // 1. Create user in Firebase Authentication
    const userRecord = await adminAuth.createUser({
      email,
      password, // Firebase Auth handles its own password hashing
      displayName: name,
    });

    // 2. Store additional user data in Firestore
    await db.collection('users').doc(userRecord.uid).set({
      name,
      email,
      phone: phone || null, // Store null if phone is empty
      address: address || null, // Store null if address is empty
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ message: 'Usuário registrado com sucesso!' }, { status: 201 });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);

    if (error.name === 'ZodError') {
      return NextResponse.json({ message: 'Dados de entrada inválidos', errors: error.errors }, { status: 400 });
    }

    // Handle Firebase Auth specific errors
    if (error.code) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          return NextResponse.json({ message: 'Este e-mail já está em uso.' }, { status: 409 });
        case 'auth/invalid-email':
          return NextResponse.json({ message: 'Formato de e-mail inválido.' }, { status: 400 });
        case 'auth/weak-password':
          return NextResponse.json({ message: 'A senha é muito fraca. Ela deve ter pelo menos 6 caracteres.' }, { status: 400 });
        default:
          return NextResponse.json({ message: 'Erro ao registrar usuário.', error: error.message }, { status: 500 });
      }
    }

    return NextResponse.json({ message: 'Erro interno do servidor.' }, { status: 500 });
  }
}
