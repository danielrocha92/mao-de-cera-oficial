import React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/firebaseAdmin';
import AdminNav from './AdminNav';

import styles from './AdminLayout.module.css';

export default async function AdminLayout({ children }) {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get('session');

  if (!sessionCookie) {
    redirect('/conta/login?redirect=' + encodeURIComponent('/admin/dashboard'));
  } else {
    try {
      const decodedClaims = await auth.verifySessionCookie(sessionCookie.value, true);

      // Verifica se o usuário é realmente administrador
      if (!decodedClaims.admin) {
        console.warn('Usuário tentou acessar admin sem permissão:', decodedClaims.email);
        redirect('/conta');
      }
    } catch (error) {
      console.error('Sessão inválida:', error);
      redirect('/conta/login?redirect=' + encodeURIComponent('/admin/dashboard'));
    }
  }

  return (
    <div className={styles.adminLayout}>
      <AdminNav />
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}
