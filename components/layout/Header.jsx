'use client';

import { useState, useEffect, useContext, useRef } from 'react';
import { usePathname } from 'next/navigation'; // Import usePathname
import CustomLink from '../ui/CustomLink';
import styles from './Header.module.css';
import SearchIcon from '../ui/icons/SearchIcon';
import UserIcon from '../ui/icons/UserIcon';
import CartIcon from '../ui/icons/CartIcon';
import { CartAnimationContext } from '@/app/context/CartAnimationContext';
import { useTheme } from '@/app/context/ThemeContext'; // Import useTheme

const Header = ({ settings }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isInitialTransparent, setIsInitialTransparent] = useState(true); // New state
  const { setAnimationEndpoint } = useContext(CartAnimationContext);
  const cartIconRef = useRef(null);
  const pathname = usePathname(); // Get current path
  const { theme, toggleTheme } = useTheme(); // Use theme context

  const isHomePage = pathname === '/';

  useEffect(() => {
    if (cartIconRef.current) {
      setAnimationEndpoint(cartIconRef.current);
    }
  }, [setAnimationEndpoint]);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);
      setIsInitialTransparent(isHomePage && !scrolled); // Only transparent on homepage and not scrolled
    };

    if (isHomePage) {
      handleScroll(); // Set initial state
      window.addEventListener('scroll', handleScroll);
    } else {
      setIsScrolled(true); // Always scrolled on other pages
      setIsInitialTransparent(false); // Never transparent on other pages
    }

    return () => {
      if (isHomePage) {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isHomePage]);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleSearch = () => setSearchOpen(!searchOpen);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Determine header classes based on page and scroll state
  const headerClasses = [
    styles.headerWrapper,
    isHomePage ? styles.homeHeader : styles.otherHeader,
    isInitialTransparent ? styles.initialTransparent : (isScrolled ? styles.scrolled : styles.transparent),
  ].join(' ');

  return (
    <>
      <header className={headerClasses}>
        <div className={styles.topBar}>
          <p>✨ Aproveite nossas ofertas especiais! ✨</p>
        </div>

        <div className={styles.mainHeader}>
          <div className={styles.container}>
            {/* Mobile-specific hamburger */}
            <div className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`} onClick={toggleMenu} data-testid="hamburger-button">
              <div className={styles.line}></div>
              <div className={styles.line}></div>
              <div className={styles.line}></div>
            </div>

            <div className={styles.logo}>
              <CustomLink href="/">{settings?.nome_loja || 'Mão de Cera'}</CustomLink>
            </div>

            {/* Mobile Icons (Search, User, and Cart) */}
            <div className={styles.mobileHeaderIcons}>
              <button className={styles.iconButton} onClick={toggleSearch} aria-label="Buscar">
                <SearchIcon className={styles.icon} />
              </button>
              <CustomLink href="/conta/login" aria-label="Minha Conta">
                <UserIcon className={styles.icon} />
              </CustomLink>
              <CustomLink href="/carrinho" aria-label="Carrinho de Compras">
                <CartIcon className={styles.icon} ref={cartIconRef} />
              </CustomLink>
            </div>

            {/* Desktop Search */}
            <div className={styles.desktopSearchContainer}>
              <input type="text" placeholder="O que você está procurando?" className={styles.searchInput} />
              <button className={styles.searchButton}>
                <SearchIcon className={styles.searchIcon} />
              </button>
            </div>

            {/* Desktop Icons */}
            {/*
            <div className={styles.desktopIcons}>
              <CustomLink href="/conta/login" aria-label="Minha Conta">
                <UserIcon className={styles.icon} />
              </CustomLink>
              <CustomLink href="/carrinho" aria-label="Carrinho de Compras">
                <CartIcon className={styles.icon} ref={cartIconRef} />
              </CustomLink>
            </div>
            */}
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className={`${styles.mobileMenuOverlay} ${menuOpen ? styles.open : ''}`}>
          <div className={styles.mobileMenuTop}>
            <CustomLink href="/conta/login" aria-label="Minha Conta" onClick={toggleMenu} className={styles.mobileMenuLogin}>
              <UserIcon className={styles.icon} />
              <span>Minha Conta</span>
            </CustomLink>
            <button className={styles.closeMobileMenuButton} onClick={toggleMenu} aria-label="Fechar Menu">
              &times;
            </button>
          </div>

          <div className={styles.mobileMenuSearchAndCart}>
            <div className={styles.mobileSearchContainer}>
              <input type="text" placeholder="O que você está procurando?" className={styles.searchInput} />
              <button className={styles.searchButton}>
                <SearchIcon className={styles.searchIcon} />
              </button>
            </div>
            <CustomLink href="/carrinho" aria-label="Carrinho de Compras" onClick={toggleMenu} className={styles.mobileMenuCart}>
              <CartIcon className={styles.icon} />
            </CustomLink>
          </div>

          <nav className={styles.mobileNav}>
            <CustomLink href="/produtos" onClick={toggleMenu}>Velas Aromáticas</CustomLink>
            <CustomLink href="/produtos?categoria=kits" onClick={toggleMenu}>Kits</CustomLink>
            <CustomLink href="/produtos?categoria=acessorios" onClick={toggleMenu}>Acessórios</CustomLink>
            <CustomLink href="/quem-somos" onClick={toggleMenu}>Quem Somos</CustomLink>
            <CustomLink href="/contato" onClick={toggleMenu}>Contato</CustomLink>
            <CustomLink href="/conta/pedidos" onClick={toggleMenu}>Meus Pedidos</CustomLink>
            <CustomLink href="/atendimento" onClick={toggleMenu}>Atendimento</CustomLink>
          </nav>
        </div>
      )}

      {/* Search Overlay */}
      {searchOpen && (
        <div className={styles.searchOverlay}>
          <button className={styles.closeSearchButton} onClick={toggleSearch}>&times;</button>
          <div className={styles.searchOverlayContent}>
            <input type="text" placeholder="O que você está procurando?" className={styles.searchInput} autoFocus />
            <button className={styles.searchOverlayButton}>
              <SearchIcon />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;