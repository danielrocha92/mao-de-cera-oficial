'use client';

import React, { useEffect } from 'react';
import './favoritos.css';
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

  if (authLoading || !user) return <p className="loading-message">Carregando...</p>;

  return (
    <div>
      <h2 className="favoritos-title">Meus Favoritos</h2>

      <div className="empty-state-container">
        <div className="icon-wrapper">
          <MdSearch size={48} />
        </div>
        <h3 className="empty-state-title">Você ainda não tem favoritos</h3>
        <p className="empty-state-message">
          Explore a loja e clique no coração nos produtos que você mais gostar para salvá-los aqui e comprar mais tarde!
        </p>
        <Link href="/produtos" className="explore-button">
          Explorar Produtos
        </Link>
      </div>
    </div>
  );
}
