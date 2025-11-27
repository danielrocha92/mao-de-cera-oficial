'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { MdDashboard, MdShoppingBag, MdAddCircleOutline, MdListAlt, MdSettings, MdStore } from 'react-icons/md';
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
            {!isCollapsed && <h2>Admin</h2>}
            <button className={styles.collapseButton} onClick={toggleSidebar}>
            {isCollapsed ? '»' : '«'}
            </button>
        </div>
        <nav>
          <Link href="/admin/dashboard" title="Dashboard">
            <MdDashboard size={24} />
            <span className={styles.linkText}>Dashboard</span>
          </Link>
          <Link href="/admin/produtos" title="Produtos">
            <MdShoppingBag size={24} />
            <span className={styles.linkText}>Produtos</span>
          </Link>
          <Link href="/admin/produtos/novo" title="Novo Produto">
            <MdAddCircleOutline size={24} />
            <span className={styles.linkText}>Novo Produto</span>
          </Link>
          <Link href="/admin/pedidos" title="Pedidos">
            <MdListAlt size={24} />
            <span className={styles.linkText}>Pedidos</span>
          </Link>
          <Link href="/admin/configuracoes" title="Configurações">
            <MdSettings size={24} />
            <span className={styles.linkText}>Configurações</span>
          </Link>
          <Link href="/" title="Voltar para Loja">
            <MdStore size={24} />
            <span className={styles.linkText}>Voltar para Loja</span>
          </Link>
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
