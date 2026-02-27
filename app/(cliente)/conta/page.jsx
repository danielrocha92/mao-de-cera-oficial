'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ContaDashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/conta/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    const defaultGreeting = "Bem-vindo";
    if (user?.displayName) {
      setGreeting(`${defaultGreeting}, ${user.displayName.split(' ')[0]}!`);
    } else {
      setGreeting(`${defaultGreeting}!`);
    }
  }, [user]);

  if (authLoading || !user) return <p style={{ padding: '2rem', textAlign: 'center' }}>Carregando...</p>;

  return (
    <div>
      <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>{greeting}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {/* Resumo do Último Pedido */}
        <div style={{ padding: '1.5rem', border: '1px solid var(--border-color)', borderRadius: '12px', backgroundColor: 'var(--surface)' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>Último Pedido</h3>
          <p style={{ color: 'var(--text-muted)' }}>Nenhum pedido recente encontrado.</p>
          <Link href="/conta/pedidos" style={{ display: 'inline-block', marginTop: '1rem', color: 'var(--primary)', fontWeight: '500', textDecoration: 'none' }}>
            Ver Histórico Completo &rarr;
          </Link>
        </div>

        {/* Atalhos Rápidos */}
        <div style={{ padding: '1.5rem', border: '1px solid var(--border-color)', borderRadius: '12px', backgroundColor: 'var(--surface)' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>Acesso Rápido</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Link href="/conta/perfil" style={{ color: 'var(--text-primary)', textDecoration: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Editar Dados Pessoais</span>
              <span style={{ color: 'var(--text-muted)' }}>&rarr;</span>
            </Link>
            <div style={{ borderBottom: '1px solid var(--border-color)' }}></div>
             <Link href="/conta/enderecos" style={{ color: 'var(--text-primary)', textDecoration: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Gerenciar Endereços</span>
              <span style={{ color: 'var(--text-muted)' }}>&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
