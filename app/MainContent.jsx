'use client';

import { usePathname } from 'next/navigation';
import styles from './MainContent.module.css';

/**
 * This component wraps the main content of the page and applies conditional padding.
 * On the home page, no padding is applied to allow the header to overlap the hero section.
 * On all other pages, top padding is added to prevent the header from overlapping the page content.
 */
export default function MainContent({ children }) {
  const pathname = usePathname();
  
  // The home page is at the root path '/'.
  const isHomePage = pathname === '/';

  // Conditionally apply a class: `homePage` (no padding) or `mainContent` (with padding).
  const mainClassName = isHomePage ? styles.homePage : styles.mainContent;

  return (
    <main className={mainClassName}>
      {isHomePage ? (
        children
      ) : (
        <div className={styles.contentWrapper}>
          {children}
        </div>
      )}
    </main>
  );
}