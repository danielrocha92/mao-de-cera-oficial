'use client';

import React, { useEffect } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function SuportePage() {
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
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Trocas e Suporte (Central de Ajuda)</h2>

      <div style={{
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        padding: '2rem',
        marginBottom: '1.5rem'
      }}>
         <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>Solicitar Troca de Produto</h3>
         <p style={{ color: 'var(--text-muted)' }}>Você não possui pedidos recentes qualificados para troca no momento.</p>
         <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.5rem' }}>* O prazo para devoluções do código de defesa do consumidor são de 7 dias após o recebimento.</p>

      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        <div style={{
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          padding: '2rem',
        }}>
           <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>Meus Chamados Ativos</h3>
           <p style={{ color: 'var(--text-muted)' }}>Nenhum chamado de suporte pendente no momento.</p>
           <button style={{ marginTop: '1.5rem', padding: '0.6rem 1rem', border: '1px solid transparent', color: 'white', backgroundColor: 'var(--primary)', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}>
              + Abrir Novo Chamado
           </button>
        </div>

        <div style={{
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          padding: '2rem',
        }}>
           <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>Central de Dúvidas</h3>
           <p style={{ color: 'var(--text-muted)' }}>Leia nossos principais artigos para respostas imediatas.</p>
           <ul style={{ paddingLeft: '1.5rem', marginTop: '1rem', color: 'var(--primary)', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
             <li><a href="/prazos-e-entregas" style={{ color: 'inherit', textDecoration: 'none' }}>Política de Entregas</a></li>
             <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Como queimar a vela corretamente?</a></li>
           </ul>
        </div>
      </div>
    </div>
  );
}
