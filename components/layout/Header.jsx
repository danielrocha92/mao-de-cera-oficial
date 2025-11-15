'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

const Header = ({ settings }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">{settings?.nome_loja || 'Mão de Cera'}</Link>
        </div>
        <nav className={styles.nav}>
          <Link href="/produtos">Produtos</Link>
          <Link href="/quem-somos">Quem Somos</Link>
          <Link href="/carrinho">Carrinho</Link>
          <Link href="/conta/pedidos">Meus Pedidos</Link>
          <Link href="/conta/login">Login</Link>
        </nav>
        <div className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`} onClick={toggleMenu} data-testid="hamburger-button">
          <div className={styles.line}></div>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
        </div>
      </div>
      <div className={`${styles.mobileNav} ${menuOpen ? styles.open : ''}`}>
        <Link href="/produtos" onClick={toggleMenu}>Produtos</Link>
        <Link href="/quem-somos" onClick={toggleMenu}>Quem Somos</Link>
        <Link href="/carrinho" onClick={toggleMenu}>Carrinho</Link>
        <Link href="/conta/pedidos" onClick={toggleMenu}>Meus Pedidos</Link>
        <Link href="/conta/login" onClick={toggleMenu}>Login</Link>
      </div>
    </header>
  );
};

export default Header;
