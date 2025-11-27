'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './AdminLayout.module.css';

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (pathname === '/admin/login') {
    return null;
  }

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <button className={styles.hamburger} onClick={toggleMobileMenu}>
        ☰
      </button>
      <aside className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''} ${isMobileMenuOpen ? styles.mobileOpen : ''}`}>
        <div className={styles.sidebarHeader}>
            <h2>Admin</h2>
            <button className={styles.collapseButton} onClick={toggleSidebar}>
            {isCollapsed ? '»' : '«'}
            </button>
        </div>
        <nav>
          <Link href="/admin/dashboard">Dashboard</Link>
          <Link href="/admin/produtos/novo">Novo Produto</Link>
          <Link href="/admin/pedidos">Pedidos</Link>
          <Link href="/admin/configuracoes">Configurações</Link>
          <Link href="/">Voltar para Loja</Link>
        </nav>
      </aside>
      {isMobileMenuOpen && (
        <div
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 999 }}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
