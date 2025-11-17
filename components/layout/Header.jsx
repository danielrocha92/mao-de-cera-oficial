'use client';

import { useState, useEffect, useContext, useRef } from 'react';
import { usePathname } from 'next/navigation'; // Import usePathname
import Image from 'next/image';
import CustomLink from '../ui/CustomLink';
import styles from './Header.module.css';
import SearchIcon from '../ui/icons/SearchIcon';
import UserIcon from '../ui/icons/UserIcon';
import CartIcon from '../ui/icons/CartIcon';
import HeartIcon from '../ui/icons/HeartIcon';
import LocationIcon from '../ui/icons/LocationIcon';
import { CartAnimationContext } from '@/app/context/CartAnimationContext';
import { useTheme } from '@/app/context/ThemeContext'; // Import useTheme
import ThemeToggleButton from '../ui/ThemeToggleButton'; // Importar o botão

// Caminho para o logo a partir da pasta public
const logoSrc = '/imagens/mao-de-cera-oficial-logo-claro.png';

const Header = ({ settings }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { setAnimationEndpoint } = useContext(CartAnimationContext);
  const cartIconRef = useRef(null);
  const { theme, toggleTheme } = useTheme(); // Use theme context
  const pathname = usePathname();

  useEffect(() => {
    if (cartIconRef.current) {
      setAnimationEndpoint(cartIconRef.current);
    }
  }, [setAnimationEndpoint]);

  // Efeito para controlar o estado de scroll, agora aplicado a todas as páginas
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    handleScroll(); // Define o estado inicial no carregamento
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSearch = () => setSearchOpen(!searchOpen);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setSearchOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isHomePage = pathname === '/';
  // As classes agora são muito mais simples
  const headerClasses = `${styles.headerWrapper} ${
    isScrolled ? styles.scrolled : ''
  } ${!isHomePage ? styles.solidInitial : ''}`;


  return (
    <>
      <header className={headerClasses}>
        <div className={styles.topBar}>
          <p>✨ Aproveite nossas ofertas especiais! ✨</p>
        </div>

        <div className={styles.mainHeader}>
          <div className={styles.container}>
            {/* --- MOBILE HEADER --- */}
            <div className={styles.mobileOnly}>
              <div className={`${styles.hamburger}`} data-testid="hamburger-button">
                <div className={styles.line}></div>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
              </div>

              <div className={styles.logoWrapper}>
                <CustomLink href="/" className={styles.logoLink}>
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

              <div className={styles.mobileHeaderIcons}>
                <button className={styles.iconButton} onClick={toggleSearch} aria-label="Buscar">
                  <SearchIcon className={styles.mobileIcon} />
                </button>
                <CustomLink href="/conta/login" aria-label="Minha Conta">
                  <UserIcon className={styles.mobileIcon} />
                </CustomLink>
                <CustomLink href="/carrinho" aria-label="Carrinho de Compras">
                  <CartIcon className={styles.mobileIcon} ref={cartIconRef} />
                </CustomLink>
              </div>
            </div>

            {/* --- DESKTOP HEADER (Fast Shop Style) --- */}
            <div className={styles.desktopOnly}>
              <div className={styles.desktopLeft}>
                <div className={styles.logoWrapper}>
                  <CustomLink href="/" className={styles.logoLink}>
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
              </div>

              <nav className={styles.desktopNav}>
                <CustomLink href="/produtos">Velas Aromáticas</CustomLink>
                <CustomLink href="/produtos?categoria=kits">Kits</CustomLink>
                <CustomLink href="/produtos?categoria=acessorios">Acessórios</CustomLink>
                <CustomLink href="/quem-somos">Quem Somos</CustomLink>
              </nav>

              <div className={styles.desktopRight}>
                <div className={styles.desktopSearchContainer}>
                  <input type="text" placeholder="O que você está procurando?" className={styles.searchInput} />
                  <button className={styles.searchButton}>
                    <SearchIcon className={styles.searchIcon} />
                  </button>
                </div>
                <div className={styles.desktopIcons}>
                  <CustomLink href="/cep" aria-label="Informe seu CEP">
                    <LocationIcon className={styles.icon} />
                  </CustomLink>
                  <CustomLink href="/favoritos" aria-label="Favoritos">
                    <HeartIcon className={styles.icon} />
                  </CustomLink>
                  <CustomLink href="/conta/login" aria-label="Minha Conta">
                    <UserIcon className={styles.icon} />
                  </CustomLink>
                  <CustomLink href="/carrinho" aria-label="Carrinho de Compras">
                    <CartIcon className={styles.icon} ref={cartIconRef} />
                  </CustomLink>
                  <ThemeToggleButton className={styles.themeToggle} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

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