'use client';

import React, { useState } from 'react';
import { FaTruck, FaExclamationTriangle, FaLock } from 'react-icons/fa';

const FreightCalculator = () => {
  const [cep, setCep] = useState('');
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [calculatedCep, setCalculatedCep] = useState('');
  const [showAllQuotes, setShowAllQuotes] = useState(false);

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
        setCalculatedCep(cep);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("Erro ao calcular frete:", error);
    } finally {
      setLoading(false);
    }
  };

  const getDeliveryDateText = (days) => {
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + days);
    const dayOfWeek = deliveryDate.toLocaleDateString('pt-BR', { weekday: 'long' });
    const dayAndMonth = deliveryDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
    // ex: "terça 03/03"
    return `Chega ${dayOfWeek.split('-')[0]} ${dayAndMonth}`;
  };

  const formatCep = (value) => {
    return value.replace(/\D/g, '').replace(/^(\d{5})(\d)/, '$1-$2').substr(0, 9);
  };

  if (quotes.length > 0) {
     return (
        <div style={{ marginTop: '2rem', fontFamily: 'sans-serif' }}>
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ color: '#4a4a4a', fontSize: '0.95rem' }}>
                 Entregas para o CEP: <strong>{calculatedCep}</strong>
              </span>
              <button
                 onClick={() => {
                   setQuotes([]);
                   setShowAllQuotes(false);
                 }}
                 style={{ backgroundColor: '#9b59b6', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold', cursor: 'pointer', textTransform: 'uppercase' }}
              >
                 Alterar CEP
              </button>
           </div>

           <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem', color: '#5e35b1' }}>
                 <FaTruck size={20} />
                 <span style={{ fontSize: '1rem' }}>Envio a domicílio</span>
              </div>

              <div style={{ border: '1px solid #eee', borderRadius: '6px', overflow: 'hidden' }}>
                 {(showAllQuotes ? quotes : quotes.slice(0, 2)).map((quote, index) => (
                    <div key={index} style={{ padding: '1rem', borderBottom: index !== (showAllQuotes ? quotes.length - 1 : 1) ? '1px solid #eee' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                       <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                          <span style={{ color: '#7f8c8d', fontSize: '0.9rem' }}>{quote.nome}</span>
                          <span style={{ color: '#34495e', fontSize: '0.85rem' }}>{getDeliveryDateText(quote.prazo)}</span>
                       </div>
                       <strong style={{ color: '#2c3e50', fontSize: '1.1rem' }}>R${quote.valor.toFixed(2).replace('.', ',')}</strong>
                    </div>
                 ))}
              </div>

              {quotes.length > 2 && (
                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                   <button
                      onClick={() => setShowAllQuotes(!showAllQuotes)}
                      style={{ color: '#9b59b6', textDecoration: 'underline', fontSize: '0.9rem', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                   >
                     {showAllQuotes ? 'Ver menos opções de envio' : 'Ver mais opções de envio'}
                   </button>
                   <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.85rem', color: '#2c3e50' }}>O prazo de entrega <strong>não contabiliza feriados.</strong></p>
                </div>
              )}
           </div>

           <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem', color: '#5e35b1' }}>
                 <FaLock size={16} />
                 <span style={{ fontSize: '1rem' }}>Compra protegida</span>
              </div>
              <div style={{ border: '1px solid #eee', borderRadius: '6px', padding: '1rem' }}>
                 <p style={{ color: '#34495e', fontSize: '0.9rem', margin: 0 }}>Seus dados cuidados durante toda a compra.</p>
              </div>
           </div>
        </div>
     );
  }

  return (
    <div style={{ marginTop: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem', color: '#5e35b1' }}>
         <FaTruck size={20} />
         <span style={{ fontSize: '1rem' }}>Meios de envio</span>
      </div>
      <form onSubmit={handleCalculate} style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
        <input
          type="text"
          value={cep}
          onChange={(e) => setCep(formatCep(e.target.value))}
          placeholder="Seu CEP"
          maxLength={9}
          style={{ padding: '0.8rem', flex: 1, border: '1px solid #ddd', borderRadius: '4px', fontSize: '1rem', outline: 'none' }}
        />
        <button type="submit" disabled={loading} style={{ padding: '0.8rem 1.5rem', backgroundColor: '#9b59b6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          {loading ? 'Calculando...' : 'OK'}
        </button>
      </form>
      <a href="https://buscacepinter.correios.com.br/app/endereco/index.php" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginTop: '0.5rem', fontSize: '0.8rem', color: '#9b59b6', textDecoration: 'underline' }}>
         Não sei meu CEP
      </a>
    </div>
  );
};

export default FreightCalculator;
