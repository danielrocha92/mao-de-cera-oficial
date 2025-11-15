import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { adminAuth } from '@/lib/firebaseAdmin';
import styles from './AdminLayout.module.css';

async function checkAdminAuth() {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get('session')?.value;

  if (!sessionCookie) {
    return false;
  }

  try {
    // Verifica o cookie da sessão. O segundo argumento `true` verifica se o cookie foi revogado.
    const decodedToken = await adminAuth.verifySessionCookie(sessionCookie, true);
    
    // Verifica se o usuário tem a custom claim de admin.
    if (decodedToken.admin === true) {
      return true;
    }
    return false;
  } catch (error) {
    // O cookie é inválido (expirado, etc).
    console.error('Erro ao verificar o cookie da sessão:', error);
    return false;
  }
}

export default async function AdminLayout({ children }) {
  const isAdmin = await checkAdminAuth();

  // Se não for admin, redireciona para a página de login do admin.
  if (!isAdmin) {
    redirect('/admin/login');
  }

  return (
    <div className={styles.adminLayout}>
      <aside className={styles.sidebar}>
        <h2>Admin</h2>
        <nav>
          <Link href="/admin/dashboard">Dashboard</Link>
          <Link href="/admin/produtos/novo">Novo Produto</Link>
          <Link href="/admin/pedidos">Pedidos</Link>
          <Link href="/admin/campanhas">Campanhas</Link>
          <Link href="/admin/configuracoes">Configurações</Link>
          <Link href="/">Voltar para Loja</Link>
        </nav>
      </aside>
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}
