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

// Caminho para o logo a partir da pasta public
const logoSrc = '/imagens/mao-de-cera-oficial-logo-claro.png';

const Header = ({ settings }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  // ADICIONADO: Estado para controlar o menu mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { setAnimationEndpoint } = useContext(CartAnimationContext);
  const cartIconRef = useRef(null);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    if (cartIconRef.current) {
      setAnimationEndpoint(cartIconRef.current);
    }
  }, [setAnimationEndpoint]);

  // Efeito para controlar o estado de scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ADICIONADO: Função para abrir/fechar o menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  // ADICIONADO: Função para fechar o menu (usada nos links)
  const closeMenu = () => {
    setIsMenuOpen(false);
  }

  const isHomePage = pathname === '/';
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
            
            {/* --- Bloco .mobileOnly (Linha 1: Hambúrguer, Logo, Ícones) --- */}
            <div className={styles.mobileOnly}>
              
              {/* MODIFICADO: Adicionado onClick e classe 'open' */}
              <div 
                className={`${styles.hamburger} ${isMenuOpen ? styles.open : ''}`} 
                data-testid="hamburger-button"
                onClick={toggleMenu} // <-- Adicionado o evento de clique
              >
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
                <CustomLink href="/conta/login" aria-label="Minha Conta">
                  <UserIcon className={styles.mobileIcon} />
                </CustomLink>
                <CustomLink href="/carrinho" aria-label="Carrinho de Compras">
                  <CartIcon className={styles.mobileIcon} ref={cartIconRef} />
                </CustomLink>
              </div>
            </div>

            {/* --- Bloco .mobileSearchContainer (Linha 2: Barra de Busca) --- */}
            <div className={styles.mobileSearchContainer}>
              <input type="text" placeholder="O que você está procurando?" className={styles.searchInput} />
              <button className={styles.searchButton}>
                <SearchIcon className={styles.searchIcon} />
              </button>
            </div>


            {/* --- Bloco .desktopOnly (Layout de Desktop) --- */}
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

      {/* ADICIONADO: O menu overlay que será aberto */}
      <div 
        className={`${styles.mobileMenuOverlay} ${isMenuOpen ? styles.active : ''}`}
      >
        <nav className={styles.mobileNav}>
          {/* Adicionamos 'closeMenu' para fechar o menu ao clicar num link */}
          <CustomLink href="/produtos" onClick={closeMenu}>Velas Aromáticas</CustomLink>
          <CustomLink href="/produtos?categoria=kits" onClick={closeMenu}>Kits</CustomLink>
          <CustomLink href="/produtos?categoria=acessorios" onClick={closeMenu}>Acessórios</CustomLink>
          <CustomLink href="/quem-somos" onClick={closeMenu}>Quem Somos</ComLink>
        </nav>
      </div>
    </>
  );
};

export default Header;
