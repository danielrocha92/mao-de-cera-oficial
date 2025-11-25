'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './PromotionalCards.module.css';

const PromotionalCards = () => {
  const [promoCards, setPromoCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPromoCards = async () => {
      try {
        const response = await fetch('/api/promocards');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPromoCards(data);
      } catch (e) {
        console.error("Failed to fetch promotional cards:", e);
        setError("Failed to load promotional content.");
      } finally {
        setLoading(false);
      }
    };

    fetchPromoCards();
  }, []);

  if (loading) {
    return (
      <section className={styles.promotionalCardsSection}>
        <p style={{ textAlign: 'center' }}>Carregando promoções...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.promotionalCardsSection}>
        <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>
      </section>
    );
  }

  if (promoCards.length === 0) {
    return null; // Don't render section if no cards
  }

  return (
    <section className className={styles.promotionalCardsSection}>
      <h2 className={styles.title}>Promoções Especiais</h2> {/* Placeholder title */}
      <div className={styles.cardsContainer}>
        {promoCards.map((card) => (
          <Link href={card.link} key={card.id} className={styles.promoCardItem}>
            <Image
              src={card.image}
              alt={card.title}
              width={400} // Example width, adjust as needed
              height={200} // Example height, adjust as needed
              className={styles.promoCardImage}
            />
            <h3 className={styles.promoCardTitle}>{card.title}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default PromotionalCards;
