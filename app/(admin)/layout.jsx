import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { adminAuth } from '@/lib/firebaseAdmin';
import styles from './AdminLayout.module.css';
import Sidebar from './Sidebar';

async function checkAdminAuth() {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get('session')?.value;

  if (!sessionCookie) {
    return false;
  }

  try {
    const decodedToken = await adminAuth.verifySessionCookie(sessionCookie, true);
    return decodedToken.admin === true;
  } catch (error) {
    console.error('Erro ao verificar o cookie da sessão:', error);
    return false;
  }
}

export default async function AdminLayout({ children }) {
  const isAdmin = await checkAdminAuth();

  if (!isAdmin) {
    redirect('/admin/login');
  }

  return (
    <div className={styles.adminLayout}>
      <Sidebar />
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}
