'use client';

import React, { useEffect } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function EnderecosPage() {
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', margin: 0, color: 'var(--text-primary)' }}>Meus Endereços</h2>
        <button style={{ backgroundColor: 'var(--primary)', color: 'white', border: 'none', padding: '0.6rem 1rem', borderRadius: '8px', cursor: 'pointer', fontWeight: '500' }}>
          + Novo Endereço
        </button>
      </div>

      <div style={{ padding: '2rem', textAlign: 'center', border: '1px dashed var(--border-color)', borderRadius: '12px', color: 'var(--text-muted)' }}>
        <p>Você ainda não tem nenhum endereço salvo.</p>
        <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Os endereços que você usar no checkout aparecerão aqui automaticamente.</p>
      </div>
    </div>
  );
}
