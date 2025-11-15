'use client';

import { useState, useEffect } from 'react';
import CustomLink from '../ui/CustomLink';
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
          <CustomLink href="/">{settings?.nome_loja || 'Mão de Cera'}</CustomLink>
        </div>
        <nav className={styles.nav}>
          <CustomLink href="/produtos">Produtos</CustomLink>
          <CustomLink href="/carrinho">Carrinho</CustomLink>
          <CustomLink href="/conta/pedidos">Meus Pedidos</CustomLink>
          <CustomLink href="/conta/login">Login</CustomLink>
        </nav>
        <div className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`} onClick={toggleMenu} data-testid="hamburger-button">
          <div className={styles.line}></div>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
        </div>
      </div>
      <div className={`${styles.mobileNav} ${menuOpen ? styles.open : ''}`}>
        <CustomLink href="/produtos" onClick={toggleMenu}>Produtos</CustomLink>
        <CustomLink href="/carrinho" onClick={toggleMenu}>Carrinho</CustomLink>
        <CustomLink href="/conta/pedidos" onClick={toggleMenu}>Meus Pedidos</CustomLink>
        <CustomLink href="/conta/login" onClick={toggleMenu}>Login</CustomLink>
      </div>
    </header>
  );
};

export default Header;
