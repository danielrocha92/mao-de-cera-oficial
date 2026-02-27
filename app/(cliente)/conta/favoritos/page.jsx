'use client';

import React, { useEffect } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { MdSearch } from 'react-icons/md';

export default function FavoritosPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/conta/login');
    }
  }, [user, authLoading, router]);

  if (authLoading || !user) return <p style={{ padding: '2rem', textAlign: 'center' }}>Carregando...</p>;

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Meus Favoritos</h2>

      <div style={{
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        padding: '3rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem'
      }}>
        <div style={{ backgroundColor: '#f5f5f5', padding: '1rem', borderRadius: '50%', color: 'var(--text-muted)' }}>
          <MdSearch size={48} />
        </div>
        <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', margin: 0 }}>Você ainda não tem favoritos</h3>
        <p style={{ color: 'var(--text-secondary)', textAlign: 'center', maxWidth: '400px' }}>
          Explore a loja e clique no coração nos produtos que você mais gostar para salvá-los aqui e comprar mais tarde!
        </p>
        <Link href="/produtos" style={{
          marginTop: '1rem',
          padding: '0.8rem 1.5rem',
          backgroundColor: 'var(--primary)',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '8px',
          fontWeight: '500'
        }}>
          Explorar Produtos
        </Link>
      </div>
    </div>
  );
}
