import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './CategoryCarousel.module.css';

const categories = [
  {
    name: "Velas e Gatinhos",
    image: "https://dcdn-us.mitiendanube.com/stores/006/237/689/products/114-c7f00c4d572abde8bf17583155479214-1024-1024.webp",
    link: "/produtos?categoria=velas-e-gatinhos"
  },
  {
    name: "Cera e Versos",
    image: "https://dcdn-us.mitiendanube.com/stores/006/237/689/products/img_6817-473cf372592bdea1d117555491003921-1024-1024.webp",
    link: "/produtos?categoria=cera-e-versos"
  },
  {
    name: "Cera e Frutas",
    image: "https://dcdn-us.mitiendanube.com/stores/006/237/689/products/1-32794ecd319cefd88f17583113135088-1024-1024.webp",
    link: "/produtos?categoria=cera-e-frutas"
  },
  {
    name: "Cera e Bala Fini",
    image: "https://dcdn-us.mitiendanube.com/stores/006/237/689/products/193-b227074fd7cb53b09c17583160949692-1024-1024.webp",
    link: "/produtos?categoria=cera-e-bala-fini"
  },
  {
    name: "Coleção Elementos",
    image: "https://dcdn-us.mitiendanube.com/stores/006/237/689/products/59-7f0bafa59a47cde01617583184455059-1024-1024.webp",
    link: "/produtos?categoria=colecao-elementos"
  },
  {
    name: "Universo em Lata",
    image: "https://dcdn-us.mitiendanube.com/stores/006/237/689/products/135-86cf7fd0717d6938db17583183653816-1024-1024.webp",
    link: "/produtos?categoria=universo-em-lata"
  },
  {
    name: "Memórias em Lata",
    image: "https://dcdn-us.mitiendanube.com/stores/006/237/689/products/167-5a1208832953b2020e17583167541932-1024-1024.webp",
    link: "/produtos?categoria=memorias-em-lata"
  },
  {
    name: "Clássicos do Coração",
    image: "https://dcdn-us.mitiendanube.com/stores/006/237/689/products/250-ee27de001fd931ec5617583764770226-640-0.webp",
    link: "/produtos?categoria=classicos-do-coracao"
  },
  {
    name: "Mar em Mim",
    image: "https://dcdn-us.mitiendanube.com/stores/006/237/689/products/48-342529cb329e6bfcc517583187260386-1024-1024.webp",
    link: "/produtos?categoria=mar-em-mim"
  }
];

const CategoryCarousel = () => {
  return (
    <section className={styles.carouselSection}>
      <h2 className={styles.title}>Categorias</h2>
      <div className={styles.carouselContainer}>
        {categories.map((cat, index) => (
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
