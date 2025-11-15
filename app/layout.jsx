import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
// import { getStoreSettings } from '@/lib/firestore'; // Placeholder

export const metadata = {
  title: 'Mão de Cera Oficial',
  description: 'E-commerce da Mão de Cera Oficial',
};

// This function is a placeholder for fetching store settings from Firestore.
// In a real scenario, you would fetch this data from your database.
async function getStoreSettings() {
    console.log("Fetching store settings... (placeholder)");
    // const settings = await getStoreSettings(); // Real implementation
    // For now, return mock data
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


import { TransitionProvider } from '@/context/TransitionContext';
import PageTransition from '@/components/animations/PageTransition';

export default async function RootLayout({ children }) {
  // Fetch store-wide settings, including tracking IDs
  const settings = await getStoreSettings();

  return (
    <html lang="pt-BR">
      <head>
        {/* 
          TODO: Inject tracking scripts here based on fetched settings.
          Use next/script for optimized script loading.
          Example for GTM:
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${settings.codigos_externos.gtm_id}');
            `}
          </Script>
        */}
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body>
        <TransitionProvider>
          <PageTransition>
            {/* Pass settings to Header and Footer */}
            <Header settings={settings} />
            <main>{children}</main>
            <Footer settings={settings} />
          </PageTransition>
        </TransitionProvider>
      </body>
    </html>
  );
}
