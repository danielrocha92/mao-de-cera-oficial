'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import ClientSidebar from './ClientSidebar';
import styles from './ClientLayout.module.css';

export default function ContaLayout({ children }) {
  const pathname = usePathname();

  // Hide wrapper layout if we are on login/cadastro (they manage their own styling)
  if (pathname.includes('/login') || pathname.includes('/cadastro')) {
    return <>{children}</>;
  }

  return (
    <div className={styles.contaLayout}>
      <ClientSidebar />
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}
