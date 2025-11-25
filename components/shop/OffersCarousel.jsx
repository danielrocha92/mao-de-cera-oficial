'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './OffersCarousel.module.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const OffersCarousel = () => {
  const carouselRef = useRef(null);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

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
        console.error(err);
        // Silently fail for now on the homepage
      } finally {
        setLoading(false);
      }
    }
    fetchOffers();
  }, []);

  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className={styles.offersWrapper}>
        <h2 className={styles.title}>Ofertas Especiais</h2>
        <p style={{ textAlign: 'center' }}>Carregando...</p>
      </div>
    );
  }

  if (offers.length === 0) {
    return null; // Don't render the section if there are no offers
  }

  return (
    <div className={styles.offersWrapper}>
      <h2 className={styles.title}>Ofertas Especiais</h2>
      <div className={styles.carouselWrapper}>
        <button onClick={() => scroll('left')} className={`${styles.navButton} ${styles.prevButton}`}>
          <FaChevronLeft />
        </button>
        <div className={styles.carouselContainer} ref={carouselRef}>
          {offers.map((offer) => (
            <Link href={offer.link} key={offer.id} className={styles.offerItem}>
              <div className={styles.imageWrapper}>
                <Image
                  src={offer.image}
                  alt={offer.name}
                  width={350}
                  height={150}
                  className={styles.offerImage}
                />
              </div>
              <span className={styles.offerName}>{offer.name}</span>
            </Link>
          ))}
        </div>
        <button onClick={() => scroll('right')} className={`${styles.navButton} ${styles.nextButton}`}>
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default OffersCarousel;
