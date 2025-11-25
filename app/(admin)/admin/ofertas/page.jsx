'use client';

import { useState, useEffect } from 'react';
import styles from './Ofertas.module.css';

export default function OfertasAdminPage() {
  const [offers, setOffers] = useState([]);
  const [newOffer, setNewOffer] = useState({ name: '', image: '', link: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchOffers() {
      try {
        setLoading(true);
        const response = await fetch('/api/ofertas');
        if (!response.ok) {
          throw new Error('Falha ao buscar ofertas');
        }
        const data = await response.json();
        setOffers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchOffers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOffer(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/ofertas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newOffer),
      });

      if (!response.ok) {
        throw new Error('Falha ao criar oferta');
      }
      
      const createdOffer = await response.json();
      // Optimistically add the new offer to the list
      setOffers(prev => [{ ...newOffer, id: createdOffer.id }, ...prev]);
      setNewOffer({ name: '', image: '', link: '' }); // Reset form
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Gerenciar Ofertas</h1>

      <div className={styles.formContainer}>
        <h2>Adicionar Nova Oferta</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Nome da Oferta</label>
            <input
              type="text"
              id="name"
              name="name"
              value={newOffer.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="image">URL da Imagem</label>
            <input
              type="text"
              id="image"
              name="image"
              value={newOffer.image}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="link">Link de Destino</label>
            <input
              type="text"
              id="link"
              name="link"
              value={newOffer.link}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className={styles.submitButton}>Adicionar Oferta</button>
        </form>
        {error && <p className={styles.error}>{error}</p>}
      </div>

      <div className={styles.listContainer}>
        <h2>Ofertas Atuais</h2>
        {loading ? (
          <p>Carregando ofertas...</p>
        ) : (
          <ul className={styles.offerList}>
            {offers.map(offer => (
              <li key={offer.id} className={styles.offerItem}>
                <img src={offer.image} alt={offer.name} className={styles.offerImage} />
                <div className={styles.offerInfo}>
                  <strong>{offer.name}</strong>
                  <span>{offer.link}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
