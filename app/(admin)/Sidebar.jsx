'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './AdminLayout.module.css';

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          <Link href="/admin/produtos">Produtos</Link>
          <Link href="/admin/pedidos">Pedidos</Link>
          <Link href="/admin/campanhas">Campanhas</Link>
          <Link href="/admin/configuracoes">Configurações</Link>
          <Link href="/">Voltar para Loja</Link>
        </nav>
      </aside>
    </>
  );
}
