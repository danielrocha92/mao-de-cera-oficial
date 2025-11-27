import { NextResponse } from 'next/server';

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Proteção de rotas Admin
  if (pathname.startsWith('/admin')) {
    // Verifica se é a página de login do admin para não entrar em loop
    if (pathname === '/admin/login') {
      return NextResponse.next();
    }

    // Verifica a presença do cookie de sessão
    const session = request.cookies.get('session');

    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // Para validação completa do token, faremos no Server Component (layout)
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
