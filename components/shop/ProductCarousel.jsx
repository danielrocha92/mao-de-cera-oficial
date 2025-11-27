'use client';

import React, { useRef } from 'react';
import ProductCard from './ProductCard';
import styles from './ProductCarousel.module.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ProductCarousel = ({ title, products }) => {
  const carouselRef = useRef(null);

  if (!products || products.length === 0) return null;

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.carouselSection}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
      </div>
      <div className={styles.carouselWrapper}>
        <button onClick={scrollLeft} className={`${styles.arrowButton} ${styles.leftArrow}`} aria-label="Anterior">
          <FaChevronLeft />
        </button>

        <div className={styles.carouselContainer} ref={carouselRef}>
          {products.map(product => (
            <div key={product.id} className={styles.cardWrapper}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <button onClick={scrollRight} className={`${styles.arrowButton} ${styles.rightArrow}`} aria-label="Próximo">
          <FaChevronRight />
        </button>
      </div>
    </section>
  );
};

export default ProductCarousel;
