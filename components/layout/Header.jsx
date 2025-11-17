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
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { setAnimationEndpoint } = useContext(CartAnimationContext);
  const cartIconRef = useRef(null);
  const { theme, toggleTheme } = useTheme(); // Use theme context

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

  // As classes agora são muito mais simples
  const headerClasses = `${styles.headerWrapper} ${isScrolled ? styles.scrolled : ''}`;


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
              <div className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`} onClick={toggleMenu} data-testid="hamburger-button">
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
                <ThemeToggleButton className={styles.themeToggle} />
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