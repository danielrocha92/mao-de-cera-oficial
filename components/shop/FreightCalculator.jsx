'use client';

import React, { useState } from 'react';

const FreightCalculator = () => {
  const [cep, setCep] = useState('');
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleCalculate = async (e) => {
    e.preventDefault();
    if (cep.length < 8) return;

    setLoading(true);
    try {
      const res = await fetch('/api/frete/calcular', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cep }),
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        setQuotes(data);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("Erro ao calcular frete:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid var(--border-color)' }}>
      <h3>Calcular Frete</h3>
      <form onSubmit={handleCalculate} style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <input
          type="text"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          placeholder="Digite seu CEP"
          maxLength={9}
          style={{ padding: '0.5rem', flex: 1 }}
        />
        <button type="submit" disabled={loading} style={{ padding: '0.5rem 1rem' }}>
          {loading ? 'Calculando...' : 'Calcular'}
        </button>
      </form>

      {quotes.length > 0 && (
        <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
          {quotes.map((quote, index) => (
            <li key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #eee' }}>
              <span>{quote.nome} - {quote.prazo} dias</span>
              <strong>R$ {quote.valor.toFixed(2)}</strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FreightCalculator;
