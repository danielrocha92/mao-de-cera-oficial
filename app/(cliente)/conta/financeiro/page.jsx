'use client';

import React, { useEffect } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function FinanceiroPage() {
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
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Financeiro / Cartões</h2>

      <div style={{
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        padding: '2rem',
        marginBottom: '1.5rem'
      }}>
         <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>Cartões Salvos</h3>
         <p style={{ color: 'var(--text-muted)' }}>Você não possui cartões de crédito tokenizados e salvos no momento.</p>
         <button style={{ marginTop: '1rem', padding: '0.6rem 1rem', border: '1px solid var(--primary)', color: 'var(--primary)', backgroundColor: 'transparent', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}>
            + Adicionar Cartão
         </button>
      </div>

      <div style={{
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        padding: '2rem',
      }}>
         <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>Faturas ou Saldo (Vouchers)</h3>
         <p style={{ color: 'var(--text-muted)' }}>Nenhum histórico financeiro encontrado (Sem boletos pendentes ou saldo cashback ativos).</p>
      </div>
    </div>
  );
}
