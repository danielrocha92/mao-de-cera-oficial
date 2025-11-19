'use client';

import { useState, useEffect, useContext, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import CustomLink from '../ui/CustomLink';
import styles from './Header.module.css';
import SearchIcon from '../ui/icons/SearchIcon';
import UserIcon from '../ui/icons/UserIcon';
import CartIcon from '../ui/icons/CartIcon';
import HeartIcon from '../ui/icons/HeartIcon';
import LocationIcon from '../ui/icons/LocationIcon';
import { CartAnimationContext } from '@/app/context/CartAnimationContext';
import { useTheme } from '@/app/context/ThemeContext';
import ThemeToggleButton from '../ui/ThemeToggleButton';

const logoSrc = '/imagens/mao-de-cera-oficial-logo-claro.png';
const DESKTOP_BREAKPOINT = 768;

const Header = ({ settings }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartIconRef = useRef(null);
  const { setAnimationEndpoint } = useContext(CartAnimationContext);
  const pathname = usePathname();

  useEffect(() => {
    if (cartIconRef.current) {
      setAnimationEndpoint(cartIconRef.current);
    }
  }, [setAnimationEndpoint]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    const handleResize = () => {
      if (window.innerWidth >= DESKTOP_BREAKPOINT) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('resize', handleResize);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const isHomePage = pathname === '/';
  const headerClasses = `${styles.headerWrapper} ${
    isScrolled ? styles.scrolled : ''
  } ${!isHomePage ? styles.solidInitial : ''}`;

  return (
    <header className={headerClasses}>
      <div className={styles.topBar}>
        <p>✨ Aproveite nossas ofertas especiais! ✨</p>
      </div>

      <div className={styles.mainHeader}>
        <div className={styles.container}>
          
          {/* --- Botão Hamburger (Mobile) --- */}
          <div 
            className={`${styles.hamburger} ${isMenuOpen ? styles.open : ''}`} 
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMenuOpen}
          >
            <div className={styles.line}></div>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
          </div>

          {/* --- Logo (Unificado) --- */}
          <div className={styles.logoWrapper}>
            <CustomLink href="/" className={styles.logoLink} onClick={closeMenu}>
              <Image
                src={logoSrc}
                alt="Mão de Cera Oficial Logo"
                fill
                sizes="(max-width: 767px) 45px, 70px"
                priority
                className={styles.logoImage}
              />
            </CustomLink>
          </div>
          
          {/* --- Barra de Busca (Central no Desktop) --- */}
          <div className={styles.searchWrapper}>
            <input type="text" placeholder="O que você está procurando?" className={styles.searchInput} />
            <button className={styles.searchButton} aria-label="Buscar">
              <SearchIcon className={styles.searchIcon} />
            </button>
          </div>

          {/* --- Ícones (Direita) --- */}
          <div className={styles.iconsWrapper}>
            <CustomLink href="/cep" aria-label="Informe seu CEP" className={styles.desktopOnlyIcon}>
              <LocationIcon className={styles.icon} />
            </CustomLink>
            <CustomLink href="/favoritos" aria-label="Favoritos" className={styles.desktopOnlyIcon}>
              <HeartIcon className={styles.icon} />
            </CustomLink>
            <CustomLink href="/conta/login" aria-label="Minha Conta">
              <UserIcon className={styles.icon} />
            </CustomLink>
            <CustomLink href="/carrinho" aria-label="Carrinho de Compras">
              <CartIcon className={styles.icon} ref={cartIconRef} />
            </CustomLink>
            <ThemeToggleButton className={`${styles.themeToggle} ${styles.desktopOnlyIcon}`} />
          </div>
        </div>
      </div>

      {/* --- Barra de Navegação Secundária (Desktop) --- */}
      <nav className={styles.secondaryNav}>
        <div className={styles.container}>
          <CustomLink href="/produtos">Velas Aromáticas</CustomLink>
          <CustomLink href="/produtos?categoria=kits">Kits</CustomLink>
          <CustomLink href="/produtos?categoria=acessorios">Acessórios</CustomLink>
          <CustomLink href="/quem-somos">Quem Somos</CustomLink>
        </div>
      </nav>

      {/* --- Menu Overlay (Mobile) --- */}
      <div 
        className={`${styles.mobileMenuOverlay} ${isMenuOpen ? styles.active : ''}`}
        onClick={closeMenu}
      >
        <nav className={styles.mobileNav} onClick={(e) => e.stopPropagation()}>
          <CustomLink href="/produtos" onClick={closeMenu}>Velas Aromáticas</CustomLink>
          <CustomLink href="/produtos?categoria=kits" onClick={closeMenu}>Kits</CustomLink>
          <CustomLink href="/produtos?categoria=acessorios" onClick={closeMenu}>Acessórios</CustomLink>
          <CustomLink href="/quem-somos" onClick={closeMenu}>Quem Somos</CustomLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
