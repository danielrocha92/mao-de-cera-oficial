'use client';

import React from 'react';
import './favoritos.css';
import { useFavorites } from '@/app/context/FavoritesContext';
import Link from 'next/link';
import { MdFavoriteBorder } from 'react-icons/md';
import ProductCard from '@/components/shop/ProductCard';

export default function FavoritosPage() {
  const { favorites, loading } = useFavorites();

  if (loading) return <p className="loading-message">Carregando seus favoritos...</p>;

  return (
    <div>
      <h2 className="favoritos-title">Meus Favoritos</h2>

      {favorites.length === 0 ? (
        <div className="empty-state-container">
          <div className="icon-wrapper">
            <MdFavoriteBorder size={48} />
          </div>
          <h3 className="empty-state-title">Sua lista está vazia</h3>
          <p className="empty-state-message">
            Você ainda não favoritou nenhum produto. Explore nossa loja e clique no coração para salvar seus itens desejados!
          </p>
          <Link href="/produtos" className="explore-button">
            Explorar Loja
          </Link>
        </div>
      ) : (
        <div className="favorites-grid">
          {favorites.map((product) => (
            <ProductCard
              key={product.id}
              product={{
                ...product,
                // O ProductCard espera 'id', 'nome', 'price', etc.
                // O Favorite o salvou com essas chaves (ou similares)
                price: product.preco,
                comparePrice: product.preco_promocional,
                images: [product.imagem],
                title: product.nome
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
