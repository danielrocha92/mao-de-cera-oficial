'use client';

import { useState, useEffect, useContext, useRef } from 'react';
import { usePathname } from 'next/navigation'; // Import usePathname
import CustomLink from '../ui/CustomLink';
import styles from './Header.module.css';
import SearchIcon from '../ui/icons/SearchIcon';
import UserIcon from '../ui/icons/UserIcon';
import CartIcon from '../ui/icons/CartIcon';
import { CartAnimationContext } from '@/app/context/CartAnimationContext';

const Header = ({ settings }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { setAnimationEndpoint } = useContext(CartAnimationContext);
  const cartIconRef = useRef(null);
  const pathname = usePathname(); // Get current path

  const isHomePage = pathname === '/';

  useEffect(() => {
    if (cartIconRef.current) {
      setAnimationEndpoint(cartIconRef.current);
    }
  }, [setAnimationEndpoint]);

  useEffect(() => {
    const handleScroll = () => {
      // Only apply scroll effect on the homepage
      if (isHomePage) {
        setIsScrolled(window.scrollY > 50);
      }
    };

    // Always set scrolled to true on non-homepage
    if (!isHomePage) {
      setIsScrolled(true);
    } else {
      // For homepage, check initial scroll position and add listener
      handleScroll();
      window.addEventListener('scroll', handleScroll);
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
    isScrolled ? styles.scrolled : styles.transparent,
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

            {/* Desktop Search */}
            <div className={styles.desktopSearchContainer}>
              <input type="text" placeholder="O que você está procurando?" className={styles.searchInput} />
              <button className={styles.searchButton}>
                <SearchIcon className={styles.searchIcon} />
              </button>
            </div>

            <div className={styles.iconsWrapper}>
              {/* Mobile Search Icon */}
              <button className={styles.mobileSearchIcon} onClick={toggleSearch}>
                <SearchIcon />
              </button>
              <CustomLink href="/conta/login" className={styles.iconButton}>
                <UserIcon />
                <span className={styles.iconText}>Entrar</span>
              </CustomLink>
              <div ref={cartIconRef}>
                <CustomLink href="/carrinho" className={styles.iconButton}>
                  <CartIcon />
                  <span className={styles.iconText}>Carrinho</span>
                </CustomLink>
              </div>
            </div>
          </div>
        </div>

        <nav className={`${styles.navBar} ${menuOpen ? styles.mobileNavOpen : ''}`}>
          <div className={styles.container}>
            <CustomLink href="/produtos" onClick={menuOpen ? toggleMenu : undefined}>Velas Aromáticas</CustomLink>
            <CustomLink href="/produtos?categoria=kits" onClick={menuOpen ? toggleMenu : undefined}>Kits</CustomLink>
            <CustomLink href="/produtos?categoria=acessorios" onClick={menuOpen ? toggleMenu : undefined}>Acessórios</CustomLink>
            <CustomLink href="/quem-somos" onClick={menuOpen ? toggleMenu : undefined}>Quem Somos</CustomLink>
            <CustomLink href="/contato" onClick={menuOpen ? toggleMenu : undefined}>Contato</CustomLink>
          </div>
        </nav>
      </header>

      {/* Search Overlay */}
      {searchOpen && (
        <div className={styles.searchOverlay}>
          <button className={styles.closeSearchButton} onClick={toggleSearch}>&times;</button>
          <div className={styles.searchOverlayContent}>
            <input type="text" placeholder="O que você está procurando?" className={styles.searchOverlayInput} autoFocus />
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
