'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { MdDashboard, MdShoppingBag, MdAddCircleOutline, MdListAlt, MdSettings, MdStore, MdImage } from 'react-icons/md';
import styles from './AdminLayout.module.css';

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);



  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const getLinkStyle = (path) => {
    // Exact match for the dashboard, startsWith for the rest (unless the rest are root folders)
    const isActive = path === '/admin/dashboard' ? pathname === path : pathname.startsWith(path);
    return {
      borderColor: isActive ? 'var(--primary)' : 'transparent',
      color: isActive ? 'var(--primary)' : 'var(--text-primary)'
    };
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
          <Link href="/admin/dashboard" title="Dashboard" style={getLinkStyle('/admin/dashboard')}>
            <MdDashboard size={24} />
            <span className={styles.linkText}>Dashboard</span>
          </Link>
          <Link href="/admin/produtos" title="Produtos" style={getLinkStyle('/admin/produtos')}>
            <MdShoppingBag size={24} />
            <span className={styles.linkText}>Produtos</span>
          </Link>
          <Link href="/admin/banners" title="Banners" style={getLinkStyle('/admin/banners')}>
            <MdImage size={24} />
            <span className={styles.linkText}>Banners</span>
          </Link>
          <Link href="/admin/pedidos" title="Pedidos" style={getLinkStyle('/admin/pedidos')}>
            <MdListAlt size={24} />
            <span className={styles.linkText}>Pedidos</span>
          </Link>
          <Link href="/admin/configuracoes" title="Configurações" style={getLinkStyle('/admin/configuracoes')}>
            <MdSettings size={24} />
            <span className={styles.linkText}>Configurações</span>
          </Link>
          <Link href="/" title="Voltar para Loja" style={{ color: 'var(--text-secondary)' }}>
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
