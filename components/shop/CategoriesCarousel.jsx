'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './CategoriesCarousel.module.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const categories = [
  { name: 'Velas e Gatinhos', image: 'https://dcdn-us.mitiendanube.com/stores/006/237/689/products/114-c7f00c4d572abde8bf17583155479214-1024-1024.webp', link: '/produtos?categoria=velas-e-gatinhos' },
  { name: 'Cera e Versos', image: 'https://dcdn-us.mitiendanube.com/stores/006/237/689/products/img_6817-473cf372592bdea1d117555491003921-1024-1024.webp', link: '/produtos?categoria=cera-e-versos' },
  { name: 'Cera e Frutas', image: 'https://dcdn-us.mitiendanube.com/stores/006/237/689/products/1-32794ecd319cefd88f17583113135088-1024-1024.webp', link: '/produtos?categoria=cera-e-frutas' },
  { name: 'Cera e Bala Fini', image: 'https://dcdn-us.mitiendanube.com/stores/006/237/689/products/193-b227074fd7cb53b09c17583160949692-1024-1024.webp', link: '/produtos?categoria=cera-e-bala-fini' },
  { name: 'Coleção Elementos', image: 'https://dcdn-us.mitiendanube.com/stores/006/237/689/products/59-7f0bafa59a47cde01617583184455059-1024-1024.webp', link: '/produtos?categoria=colecao-elementos' },
  { name: 'Universo em Lata', image: 'https://dcdn-us.mitiendanube.com/stores/006/237/689/products/135-86cf7fd0717d6938db17583183653816-1024-1024.webp', link: '/produtos?categoria=universo-em-lata' },
  { name: 'Memórias em Lata', image: 'https://dcdn-us.mitiendanube.com/stores/006/237/689/products/167-5a1208832953b2020e17583167541932-1024-1024.webp', link: '/produtos?categoria=memorias-em-lata' },
  { name: 'Clássicos do Coração', image: 'https://dcdn-us.mitiendanube.com/stores/006/237/689/products/250-ee27de001fd931ec5617583764770226-640-0.webp', link: '/produtos?categoria=classicos-do-coracao' },
  { name: 'Mar em Mim', image: 'https://dcdn-us.mitiendanube.com/stores/006/237/689/products/48-342529cb329e6bfcc517583187260386-1024-1024.webp', link: '/produtos?categoria=mar-em-mim' },
];

const CategoriesCarousel = () => {
  const carouselRef = useRef(null);

  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.categoriesWrapper}>
      <h2 className={styles.title}>Categorias</h2>
      <div className={styles.carouselWrapper}>
        <button onClick={() => scroll('left')} className={`${styles.navButton} ${styles.prevButton}`}>
          <FaChevronLeft />
        </button>
        <div className={styles.carouselContainer} ref={carouselRef}>
          {categories.map((category) => (
            <Link href={category.link} key={category.name} className={styles.categoryItem}>
              <div className={styles.imageWrapper}>
                <Image
                  src={category.image}
                  alt={category.name}
                  width={120}
                  height={120}
                  className={styles.categoryImage}
                />
              </div>
              <span className={styles.categoryName}>{category.name}</span>
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

export default CategoriesCarousel;
