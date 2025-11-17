// app/api/auth/session/route.js
import { adminAuth } from '@/lib/firebaseAdmin';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// POST: Cria a sessão
export async function POST(request) {
  const { idToken } = await request.json();

  if (!idToken) {
    return NextResponse.json({ error: 'ID token não fornecido' }, { status: 400 });
  }

  // Define a validade do cookie (ex: 7 dias)
  const expiresIn = 60 * 60 * 24 * 7 * 1000; // 7 dias em milissegundos

  try {
    // Cria o cookie de sessão
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });

    // Define o cookie no navegador
    cookies().set('session', sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true, // Importante para segurança
      secure: process.env.NODE_ENV === 'production', // Use 'secure' em produção
      path: '/',
    });

    return NextResponse.json({ status: 'success' }, { status: 200 });
  } catch (error) {
    console.error('Erro ao criar cookie de sessão:', error);
    return NextResponse.json({ error: 'Falha na autenticação' }, { status: 401 });
  }
}

// DELETE: Destroi a sessão (Logout)
export async function DELETE() {
  // Exclui o cookie
  cookies().delete('session');
  return NextResponse.json({ status: 'logout success' }, { status: 200 });
}