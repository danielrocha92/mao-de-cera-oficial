'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  MdDashboard,
  MdShoppingBag,
  MdImage,
  MdListAlt,
  MdSettings,
  MdStore
} from 'react-icons/md';
import styles from './AdminLayout.module.css';

export default function AdminNav() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: <MdDashboard className={styles.navIcon} /> },
    { label: 'Produtos', path: '/admin/produtos', icon: <MdShoppingBag className={styles.navIcon} /> },
    { label: 'Banners', path: '/admin/banners', icon: <MdImage className={styles.navIcon} /> },
    { label: 'Pedidos', path: '/admin/pedidos', icon: <MdListAlt className={styles.navIcon} /> },
    { label: 'Configurações', path: '/admin/configuracoes', icon: <MdSettings className={styles.navIcon} /> },
  ];

  return (
    <div className={styles.adminNav}>
      <div className={styles.navContainer}>
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.path);
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`${styles.navLink} ${isActive ? styles.activeNavLink : ''}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          );
        })}
        <Link href="/" className={styles.navLink} style={{ marginLeft: 'auto', border: 'none' }}>
          <MdStore className={styles.navIcon} />
          <span>Ver Loja</span>
        </Link>
      </div>
    </div>
  );
}
