import React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/firebaseAdmin';
import AdminSidebar from './AdminSidebar';

import styles from './AdminLayout.module.css';

export default async function AdminLayout({ children }) {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get('session');

  if (!sessionCookie) {
    // ... logic remains ...
  } else {
    try {
      await auth.verifySessionCookie(sessionCookie.value, true);
    } catch (error) {
      console.error('Sessão inválida:', error);
    }
  }

  return (
    <div className={styles.adminLayout}>
      <AdminSidebar />
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}
