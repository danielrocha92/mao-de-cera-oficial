'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { MdDashboard, MdShoppingBag, MdPerson, MdLocationOn, MdFavorite, MdPayment, MdSupportAgent, MdExitToApp } from 'react-icons/md';
import { useAuth } from '@/app/context/AuthContext';
import styles from './ClientLayout.module.css';

export default function ClientSidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();
  const router = useRouter();

  // Oculta a sidebar nas páginas de autenticação
  if (pathname.includes('/login') || pathname.includes('/cadastro')) {
    return null;
  }

  const handleLogout = async () => {
    if (window.confirm("Deseja realmente sair da sua conta?")) {
      await logout();
    }
  };

  const isActive = (path) => {
    return path === '/conta' ? pathname === path : pathname.startsWith(path);
  };

  return (
    <aside className={styles.sidebar}>
      <nav>
        <Link href="/conta" className={isActive('/conta') ? styles.active : ''}>
          <MdDashboard size={24} />
          <span>Visão Geral</span>
        </Link>
        <Link href="/conta/pedidos" className={isActive('/conta/pedidos') ? styles.active : ''}>
          <MdShoppingBag size={24} />
          <span>Meus Pedidos</span>
        </Link>
        <Link href="/conta/perfil" className={isActive('/conta/perfil') ? styles.active : ''}>
          <MdPerson size={24} />
          <span>Meus Dados</span>
        </Link>
        <Link href="/conta/enderecos" className={isActive('/conta/enderecos') ? styles.active : ''}>
          <MdLocationOn size={24} />
          <span>Meus Endereços</span>
        </Link>
        <Link href="/conta/favoritos" className={isActive('/conta/favoritos') ? styles.active : ''}>
          <MdFavorite size={24} />
          <span>Favoritos</span>
        </Link>
        <Link href="/conta/financeiro" className={isActive('/conta/financeiro') ? styles.active : ''}>
          <MdPayment size={24} />
          <span>Financeiro / Cartões</span>
        </Link>
        <Link href="/conta/suporte" className={isActive('/conta/suporte') ? styles.active : ''}>
          <MdSupportAgent size={24} />
          <span>Trocas e Suporte</span>
        </Link>
        <button onClick={handleLogout} className={styles.logoutBtn}>
          <MdExitToApp size={24} />
          <span>Sair</span>
        </button>
      </nav>
    </aside>
  );
}
