'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './CategoryCarousel.module.css';


const CategoryCarousel = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categorias');
        if (response.ok) {
          const data = await response.json();
          // Filter out categories without images if necessary, or map them to the format expected by the carousel
          const formattedCategories = data.map(cat => ({
            id: cat.id,
            name: cat.nome,
            image: cat.imagem || 'https://via.placeholder.com/100', // Provide a fallback image or handle missing images
            link: `/produtos?categoria=${cat.slug}`,
          }));
          setCategories(formattedCategories);
        }
      } catch (error) {
        console.error("Erro ao carregar categorias", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className={styles.carouselSection}>
      <h2 className={styles.title}>Categorias</h2>
      <div className={styles.carouselContainer}>
        {loading ? (
           <p>Carregando categorias...</p>
        ) : categories.length === 0 ? (
           <p>Nenhuma categoria encontrada.</p>
        ) : categories.map((cat, index) => (
          <Link href={cat.link} key={index} className={styles.categoryItem}>
            <div className={styles.imageWrapper}>
              <Image
                src={cat.image}
                alt={cat.name}
                width={100}
                height={100}
                className={styles.image}
              />
            </div>
            <span className={styles.categoryName}>{cat.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoryCarousel;
