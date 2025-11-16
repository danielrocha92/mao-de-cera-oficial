'use client';

import { usePathname } from 'next/navigation';
import styles from './MainContent.module.css';

export default function MainContent({ children }) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  // Aplica a classe 'homePage' na página inicial, e 'mainContent' nas demais.
  const mainClassName = isHomePage ? styles.homePage : styles.mainContent;

  return (
    <main className={mainClassName}>
      {children}
    </main>
  );
}
