'use client';

import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { TransitionProvider } from '@/app/context/TransitionContext';
import PageTransition from '@/components/animations/PageTransition';
import { CartAnimationProvider } from '@/app/context/CartAnimationContext';
import FlyToCartAnimation from '@/components/animations/FlyToCartAnimation';
import { ThemeProvider } from './context/ThemeContext';
import { usePathname } from 'next/navigation';
import MainContent from './MainContent';

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  return (
    <html lang="pt-BR">
      <head>
        <title>Mão de Cera Oficial</title>
        <meta name="description" content="E-commerce da Mão de Cera Oficial" />
        <link rel="icon" href="/imagens/mao-de-cera-oficial-logo-claro.png" />
      </head>
      <body>
        <ThemeProvider>
          <TransitionProvider>
            <CartAnimationProvider>
              <PageTransition>
                {!isAdmin && <Header />}
                <MainContent>{children}</MainContent>
                {!isAdmin && <Footer />}
              </PageTransition>
              <FlyToCartAnimation />
            </CartAnimationProvider>
          </TransitionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
