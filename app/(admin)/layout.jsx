// import { checkAdminAuth } from '@/lib/auth'; // Placeholder for auth check
import Link from 'next/link';
import styles from './AdminLayout.module.css';

async function checkAdminAuth() {
    // TODO: Implement real authentication check
    // 1. Get the user session (e.g., from cookies).
    // 2. Verify the session with Firebase Admin SDK.
    // 3. Check for the `isAdmin: true` custom claim.
    // 4. If not admin, redirect('/') or throw an error.
    console.log("Checking admin authentication... (placeholder)");
    const isAdmin = true; // Placeholder
    if (!isAdmin) {
        // redirect('/');
    }
    return isAdmin;
}

export default async function AdminLayout({ children }) {
    const isAdmin = await checkAdminAuth();

    if (!isAdmin) {
        return (
            <div>
                <h1>Acesso Negado</h1>
                <p>Você não tem permissão para acessar esta página.</p>
                <Link href="/conta/login">Ir para o Login</Link>
            </div>
        );
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
