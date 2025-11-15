import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../Header';

// Mock Next.js Link component
jest.mock('next/link', () => {
  return ({ children, href }) => {
    return <a href={href}>{children}</a>;
  };
});

describe('Header Component', () => {
  it('deve alternar a visibilidade do menu móvel ao clicar no ícone de hambúrguer', () => {
    render(<Header settings={{ nome_loja: 'Teste' }} />);

    // Encontra o botão de hambúrguer pelo testid
    const hamburgerButton = screen.getByTestId('hamburger-button');
    
    // Encontra um dos links no menu móvel.
    // Usamos queryByText porque ele pode não estar visível inicialmente.
    // O menu em si está sempre no DOM, então precisamos verificar sua visibilidade.
    const mobileNavLink = screen.getByText('Produtos', { selector: 'div.mobileNav a' });

    // 1. Verifica se o menu móvel não está visível inicialmente
    // A configuração do CSS o torna invisível
    expect(mobileNavLink).not.toBeVisible();

    // 2. Simula o primeiro clique para abrir o menu
    fireEvent.click(hamburgerButton);

    // 3. Verifica se o menu móvel se tornou visível
    expect(mobileNavLink).toBeVisible();

    // 4. Simula o segundo clique para fechar o menu
    fireEvent.click(hamburgerButton);

    // 5. Verifica se o menu móvel não está mais visível
    expect(mobileNavLink).not.toBeVisible();
  });
});
