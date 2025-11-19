import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { TransitionProvider } from '@/context/TransitionContext';
import PageTransition from '@/components/animations/PageTransition';
import { CartAnimationProvider } from '@/context/CartAnimationContext';
import FlyToCartAnimation from '@/components/animations/FlyToCartAnimation';
import { ThemeProvider } from './context/ThemeContext';

import MainContent from './MainContent';

export const metadata = {
  title: 'Mão de Cera Oficial',
  description: 'E-commerce da Mão de Cera Oficial',
  icons: {
    icon: '/imagens/mao-de-cera-oficial-logo-claro.png',
  },
};

async function getStoreSettings() {
    console.log("Fetching store settings... (placeholder)");
    return {
        codigos_externos: {
            gtm_id: "GTM-XXXXXX",
            ga4_id: "G-XXXXXX",
            fb_pixel_id: "FB-PIXEL-XXXXXX"
        },
        nome_loja: "Mão de Cera Oficial",
        email_contato: "contato@maodeceraoficial.com.br",
        telefone_contato: "(11) 99999-9999",
    };
}

export default async function RootLayout({ children }) {
  const settings = await getStoreSettings();

  return (
    <html lang="pt-BR">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body>
        <ThemeProvider>
          <TransitionProvider>
            <CartAnimationProvider>
              <PageTransition>
                <Header settings={settings} />
                <MainContent>{children}</MainContent>
                <Footer settings={settings} />
              </PageTransition>
              <FlyToCartAnimation />
            </CartAnimationProvider>
          </TransitionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
