'use client';

import React, { useEffect, useState } from 'react';
import styles from './FixedPromotionalCards.module.css'; // Will create this CSS module
import Image from 'next/image';
import Link from 'next/link';

const FixedPromotionalCards = () => {
  const [fixedPromoCards, setFixedPromoCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFixedPromoCards = async () => {
      try {
        const response = await fetch('/api/fixedpromocards');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Ensure only the first 3 cards are displayed, ordered by 'order' field
        const sortedCards = data.sort((a, b) => a.order - b.order).slice(0, 3);
        setFixedPromoCards(sortedCards);
      } catch (e) {
        console.error("Failed to fetch fixed promotional cards:", e);
        setError("Falha ao carregar cards promocionais fixos.");
      } finally {
        setLoading(false);
      }
    };

    fetchFixedPromoCards();
  }, []);

  if (loading) {
    return <div className={styles.container}>Carregando cards promocionais fixos...</div>;
  }

  if (error) {
    return <div className={styles.container}><p className={styles.error}>{error}</p></div>;
  }

  if (fixedPromoCards.length === 0) {
    return null; // Don't render anything if no cards are available
  }

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Nossas Coleções Exclusivas</h2> {/* Adjust title as needed */}
      <div className={styles.cardGrid}>
        {fixedPromoCards.map((card) => (
          <Link href={card.link} key={card.id} className={styles.cardLink}>
            <div className={styles.card}>
              <div className={styles.cardImageWrapper}>
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className={styles.cardContent}>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FixedPromotionalCards;