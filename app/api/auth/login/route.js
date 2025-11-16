import { NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebaseAdmin';

export async function POST(request) {
  try {
    const body = await request.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json({ error: 'Token não fornecido' }, { status: 400 });
    }

    // 1. Verificar o token de ID do Firebase
    const decodedToken = await adminAuth.verifyIdToken(token);

    // 2. Verificar se o usuário tem a custom claim 'admin: true'
    if (!decodedToken.admin) {
      return NextResponse.json({ error: 'Acesso negado. Usuário não é administrador.' }, { status: 403 });
    }

    // Define o tempo de expiração do cookie da sessão (ex: 5 dias)
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 dias em milissegundos

    // Cria o cookie da sessão com o token de ID fornecido.
    const sessionCookie = await adminAuth.createSessionCookie(token, { expiresIn });

    // Define o cookie no navegador do usuário.
    const options = {
      name: 'session',
      value: sessionCookie,
      maxAge: expiresIn,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    };

    const response = NextResponse.json({ status: 'success' });
    response.cookies.set(options);

    return response;

  } catch (error) {
    console.error('Erro na autenticação:', error);
    // Erros de verificação de token do Firebase serão capturados aqui
    return NextResponse.json({ error: 'Autenticação falhou', details: error.message }, { status: 401 });
  }
}
