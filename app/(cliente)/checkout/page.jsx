'use client';

import React, { useState } from 'react';
import { useCart } from '@/app/context/CartContext';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { cart, total } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    nome: user?.displayName || '',
    email: user?.email || '',
    cpf: '',
    telefone: '',
    cep: '',
    endereco: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Create Order in Firestore (via API or direct if allowed, but API is safer for logic)
      // For now, we'll send everything to the checkout endpoint which creates the preference

      const response = await fetch('/api/checkout/mercadopago', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart,
          payer: {
            email: formData.email,
            nome: formData.nome,
            cpf: formData.cpf
          }
        })
      });

      const data = await response.json();

      if (data.url) {
        // Redirect to Mercado Pago
        window.location.href = data.url;
      } else {
        alert('Erro ao iniciar pagamento');
      }

    } catch (error) {
      console.error(error);
      alert('Erro ao processar checkout');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    router.push('/carrinho');
    return null;
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <h1>Checkout</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>

        <section>
          <h2>Dados Pessoais</h2>
          <input name="nome" placeholder="Nome Completo" value={formData.nome} onChange={handleChange} required style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }} />
          <input name="email" placeholder="E-mail" type="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }} />
          <input name="cpf" placeholder="CPF" value={formData.cpf} onChange={handleChange} required style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }} />
          <input name="telefone" placeholder="Telefone" value={formData.telefone} onChange={handleChange} required style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }} />
        </section>

        <section>
          <h2>Endereço de Entrega</h2>
          <input name="cep" placeholder="CEP" value={formData.cep} onChange={handleChange} required style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }} />
          <input name="endereco" placeholder="Endereço" value={formData.endereco} onChange={handleChange} required style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }} />
          <div style={{ display: 'flex', gap: '1rem' }}>
            <input name="numero" placeholder="Número" value={formData.numero} onChange={handleChange} required style={{ flex: 1, padding: '0.5rem' }} />
            <input name="complemento" placeholder="Complemento" value={formData.complemento} onChange={handleChange} style={{ flex: 1, padding: '0.5rem' }} />
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
             <input name="bairro" placeholder="Bairro" value={formData.bairro} onChange={handleChange} required style={{ flex: 1, padding: '0.5rem' }} />
             <input name="cidade" placeholder="Cidade" value={formData.cidade} onChange={handleChange} required style={{ flex: 1, padding: '0.5rem' }} />
             <input name="estado" placeholder="UF" value={formData.estado} onChange={handleChange} required style={{ width: '60px', padding: '0.5rem' }} />
          </div>
        </section>

        <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #eee' }}>
          <h3>Resumo do Pedido</h3>
          <p>Total: <strong>R$ {total.toFixed(2)}</strong></p>
          <button type="submit" disabled={loading} style={{
            width: '100%',
            padding: '1rem',
            backgroundColor: 'var(--primary)',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1.2rem',
            marginTop: '1rem'
          }}>
            {loading ? 'Processando...' : 'Pagar com Mercado Pago'}
          </button>
        </div>

      </form>
    </div>
  );
}
