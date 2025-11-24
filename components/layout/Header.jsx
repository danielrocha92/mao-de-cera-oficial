'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';
import SearchIcon from '@/components/ui/icons/SearchIcon';
import UserIcon from '@/components/ui/icons/UserIcon';
import CartIcon from '@/components/ui/icons/CartIcon';
import ThemeToggleButton from '@/components/ui/ThemeToggleButton';

async function getStoreSettings() {
    console.log("Fetching store settings... (placeholder)");
    return {
        nome_loja: "Mão de Cera Oficial",
        logo: {
            url: "/imagens/mao-de-cera-oficial-logo-claro.png"
        }
    };
}

const Header = () => {
    const [settings, setSettings] = useState(null);
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isScrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    const isHomePage = pathname === '/';

    useEffect(() => {
        const fetchSettings = async () => {
            const newSettings = await getStoreSettings();
            setSettings(newSettings);
        };
        fetchSettings();
    }, []);

    useEffect(() => {
        // Adiciona o listener de scroll apenas na página inicial
        if (isHomePage) {
            const handleScroll = () => {
                setScrolled(window.scrollY > 50);
            };
            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        }
    }, [isHomePage]);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    // O header é sólido se não for a home, ou se for a home e o usuário rolou a página.
    const headerClasses = `${styles.headerWrapper} ${!isHomePage || isScrolled ? styles.scrolled : ''}`;
    const hamburgerClasses = `${styles.hamburger} ${isMenuOpen ? styles.open : ''}`;

    return (
        <header className={headerClasses}>
            <div className={styles.mainHeader}>
                <div className={styles.container}>
                    <div className={styles.topRow}>
                        <button className={hamburgerClasses} onClick={toggleMenu} data-testid="hamburger-button" aria-label="Abrir menu">
                            <div className={styles.line}></div>
                            <div className={styles.line}></div>
                            <div className={styles.line}></div>
                        </button>

                        <div className={styles.logoWrapper}>
                            <Link href="/" className={styles.logoLink}>
                                {settings?.logo && (
                                    <Image
                                        src={settings.logo.url}
                                        alt={`Logo de ${settings.nome_loja}`}
                                        fill
                                        sizes="10vw"
                                        className={styles.logoImage}
                                        priority
                                    />
                                )}
                            </Link>
                        </div>

                        <div className={styles.iconsWrapper}>
                            <Link href="/conta/login" aria-label="Minha Conta">
                                <UserIcon className={styles.icon} />
                            </Link>
                            <Link href="/carrinho" aria-label="Carrinho">
                                <CartIcon className={styles.icon} />
                            </Link>
                            <ThemeToggleButton className={styles.themeToggle} />
                        </div>
                    </div>

                    <div className={styles.searchWrapper}>
                        <input type="text" placeholder="O que você procura?" className={styles.searchInput} />
                        <button className={styles.searchButton} aria-label="Buscar">
                            <SearchIcon className={styles.searchIcon} />
                        </button>
                    </div>
                </div>
            </div>

            <nav className={`${styles.mobileNav} ${isMenuOpen ? styles.active : ''}`}>
                <Link href="/produtos" onClick={toggleMenu}>Produtos</Link>
                <Link href="/quem-somos" onClick={toggleMenu}>Quem Somos</Link>
                <Link href="/contato" onClick={toggleMenu}>Contato</Link>
                <Link href="/conta/login" onClick={toggleMenu}>Minha Conta</Link>
            </nav>
        </header>
    );
};

export default Header;
