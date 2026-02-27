'use client';
import React from 'react';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { TransitionProvider } from '@/app/context/TransitionContext';
import PageTransition from '@/components/animations/PageTransition';
import { CartAnimationProvider } from '@/app/context/CartAnimationContext';
import FlyToCartAnimation from '@/components/animations/FlyToCartAnimation';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from '@/app/context/AuthContext';
import { CartProvider } from '@/app/context/CartContext';
import { usePathname } from 'next/navigation';
import MainContent from './MainContent';
import GlobalLoader from '@/components/ui/GlobalLoader';

export default function ClientLayout({ children }) {
  const pathname = usePathname() || '';
  const isAdmin = pathname.startsWith('/admin');

  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <TransitionProvider>
            <CartAnimationProvider>
              <PageTransition>
                <GlobalLoader />
                {!isAdmin && <Header />}
                <MainContent>{children}</MainContent>
                {!isAdmin && <Footer />}
              </PageTransition>
              <FlyToCartAnimation />
            </CartAnimationProvider>
          </TransitionProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
