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

  const getLinkStyle = (path) => {
    // Para a home ('/conta'), precisamos verificar exatidão para não dar match em tudo
    const isActive = path === '/conta' ? pathname === path : pathname.startsWith(path);
    return {
      borderColor: isActive ? 'var(--primary)' : 'transparent',
      color: isActive ? 'var(--primary)' : 'var(--text-primary)'
    };
  };

  return (
    <aside className={styles.sidebar}>
      <nav>
        <Link href="/conta" style={getLinkStyle('/conta')}>
          <MdDashboard size={24} />
          <span>Visão Geral</span>
        </Link>
        <Link href="/conta/pedidos" style={getLinkStyle('/conta/pedidos')}>
          <MdShoppingBag size={24} />
          <span>Meus Pedidos</span>
        </Link>
        <Link href="/conta/perfil" style={getLinkStyle('/conta/perfil')}>
          <MdPerson size={24} />
          <span>Meus Dados</span>
        </Link>
        <Link href="/conta/enderecos" style={getLinkStyle('/conta/enderecos')}>
          <MdLocationOn size={24} />
          <span>Meus Endereços</span>
        </Link>
        <Link href="/conta/favoritos" style={getLinkStyle('/conta/favoritos')}>
          <MdFavorite size={24} />
          <span>Favoritos</span>
        </Link>
        <Link href="/conta/financeiro" style={getLinkStyle('/conta/financeiro')}>
          <MdPayment size={24} />
          <span>Financeiro / Cartões</span>
        </Link>
        <Link href="/conta/suporte" style={getLinkStyle('/conta/suporte')}>
          <MdSupportAgent size={24} />
          <span>Trocas e Suporte</span>
        </Link>
        <button onClick={handleLogout} style={{ color: '#e74c3c', marginTop: '1rem' }}>
          <MdExitToApp size={24} />
          <span>Sair</span>
        </button>
      </nav>
    </aside>
  );
}
