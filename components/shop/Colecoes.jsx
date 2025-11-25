'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Colecoes.module.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const collections = [
  {
    name: 'Velas e Gatinhos',
    image: 'https://dcdn-us.mitiendanube.com/stores/006/237/689/products/114-c7f00c4d572abde8bf17583155479214-1024-1024.webp',
    link: '/produtos?colecao=velas-e-gatinhos',
  },
  {
    name: 'Cera e Versos',
    image: 'https://dcdn-us.mitiendanube.com/stores/006/237/689/products/img_6817-473cf372592bdea1d117555491003921-1024-1024.webp',
    link: '/produtos?colecao=cera-e-versos',
  },
  {
    name: 'Cera e Frutas',
    image: 'https://dcdn-us.mitiendanube.com/stores/006/237/689/products/1-32794ecd319cefd88f17583113135088-1024-1024.webp',
    link: '/produtos?colecao=cera-e-frutas',
  },
  {
    name: 'Cera e Bala Fini',
    image: 'https://dcdn-us.mitiendanube.com/stores/006/237/689/products/193-b227074fd7cb53b09c17583160949692-1024-1024.webp',
    link: '/produtos?colecao=cera-e-bala-fini',
  },
  {
    name: 'Coleção Elementos',
    image: 'https://dcdn-us.mitiendanube.com/stores/006/237/689/products/59-7f0bafa59a47cde01617583184455059-1024-1024.webp',
    link: '/produtos?colecao=colecao-elementos',
  },
];

const Colecoes = () => {
  const carouselRef = useRef(null);

  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.collectionsWrapper}>
      <h2 className={styles.title}>Nossas Coleções</h2>
      <div className={styles.carouselWrapper}>
        <button onClick={() => scroll('left')} className={`${styles.navButton} ${styles.prevButton}`}>
          <FaChevronLeft />
        </button>
        <div className={styles.carouselContainer} ref={carouselRef}>
          {collections.map((collection) => (
            <Link href={collection.link} key={collection.name} className={styles.collectionItem}>
              <div className={styles.imageWrapper}>
                <Image
                  src={collection.image}
                  alt={collection.name}
                  width={120}
                  height={120}
                  className={styles.collectionImage}
                />
              </div>
              <span className={styles.collectionName}>{collection.name}</span>
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

export default Colecoes;