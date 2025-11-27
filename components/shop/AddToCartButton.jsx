'use client';

import React, { useState } from 'react';
import { useCart } from '@/app/context/CartContext';
import styles from './AddToCartButton.module.css'; // Assuming you will create CSS or use inline for now

const AddToCartButton = ({ product }) => {
  const { addItem } = useCart();
  const [loading, setLoading] = useState(false);

  const handleAddToCart = () => {
    setLoading(true);
    // Simulate a small delay for better UX
    setTimeout(() => {
      addItem(product, 1);
      setLoading(false);
      // Optional: Show toast
      alert('Produto adicionado ao carrinho!');
    }, 500);
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={loading}
      className={styles.button}
      style={{
        backgroundColor: 'var(--primary)',
        color: 'white',
        padding: '1rem 2rem',
        border: 'none',
        cursor: 'pointer',
        fontSize: '1rem',
        width: '100%'
      }}
    >
      {loading ? 'Adicionando...' : 'Adicionar ao Carrinho'}
    </button>
  );
};

export default AddToCartButton;
