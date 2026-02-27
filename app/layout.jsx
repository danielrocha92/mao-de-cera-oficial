import React from 'react';
import './globals.css';
import ClientLayout from './ClientLayout';

export const metadata = {
  title: 'Mão de Cera Oficial',
  description: 'E-commerce da Mão de Cera Oficial',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/imagens/mao-de-cera-oficial-logo-claro.png" />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
