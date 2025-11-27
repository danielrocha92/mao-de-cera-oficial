'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/app/context/CartContext';
import styles from './page.module.css'; // Assuming you will create CSS

export default function CartPage() {
  const { cart, total, removeItem, updateQuantity } = useCart();

  if (cart.length === 0) {
    return (
      <div style={{ padding: '4rem', textAlign: 'center' }}>
        <h1>Seu carrinho está vazio</h1>
        <Link href="/produtos" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>
          Voltar para a loja
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <h1>Carrinho de Compras</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', marginTop: '2rem' }}>

        {/* Cart Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {cart.map((item) => (
            <div key={item.id} style={{ display: 'flex', gap: '1rem', border: '1px solid #eee', padding: '1rem' }}>
              <div style={{ position: 'relative', width: '100px', height: '100px' }}>
                <Image
                  src={item.imagens?.[0] || "https://via.placeholder.com/100"}
                  alt={item.nome}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <h3>{item.nome}</h3>
                <p>R$ {Number(item.preco_promocional || item.preco).toFixed(2)}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  <button onClick={() => removeItem(item.id)} style={{ color: 'red', marginLeft: 'auto' }}>Remover</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div style={{ border: '1px solid #eee', padding: '2rem', height: 'fit-content' }}>
          <h2>Resumo</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: '1rem 0' }}>
            <span>Subtotal</span>
            <span>R$ {total.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: '1rem 0', fontWeight: 'bold' }}>
            <span>Total</span>
            <span>R$ {total.toFixed(2)}</span>
          </div>
          <Link href="/checkout">
            <button style={{
              width: '100%',
              padding: '1rem',
              backgroundColor: 'var(--primary)',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1.1rem'
            }}>
              Finalizar Compra
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
