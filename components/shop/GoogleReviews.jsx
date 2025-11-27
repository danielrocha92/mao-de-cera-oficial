import React from 'react';
import Image from 'next/image';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import styles from './GoogleReviews.module.css';

const reviews = [
  {
    id: 1,
    author: "Maria Silva",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    rating: 5,
    text: "As velas são maravilhosas! O cheiro é incrível e dura muito tempo. A embalagem é um capricho à parte. Recomendo demais!",
    date: "há 2 semanas"
  },
  {
    id: 2,
    author: "João Pereira",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    rating: 5,
    text: "Comprei o kit de presente e minha esposa adorou. Chegou super rápido e tudo muito bem embalado. Parabéns pelo trabalho!",
    date: "há 1 mês"
  },
  {
    id: 3,
    author: "Ana Costa",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026302d",
    rating: 4.5,
    text: "Adorei a vela de Figo. O aroma é suave e não enjoa. Só achei que poderia ter um tamanho maior, mas a qualidade é top.",
    date: "há 3 semanas"
  },
  {
    id: 4,
    author: "Lucas Oliveira",
    avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    rating: 5,
    text: "Experiência de compra excelente. O site é fácil de navegar e o atendimento no WhatsApp foi muito atencioso.",
    date: "há 2 meses"
  }
];

const GoogleReviews = () => {
  return (
    <section className={styles.reviewsSection}>
      <div className={styles.header}>
        <div className={styles.googleLogo}>
          <Image src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" width={80} height={26} />
          <span className={styles.ratingScore}>4.9</span>
          <div className={styles.stars}>
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </div>
          <span className={styles.totalReviews}>Baseado em 128 avaliações</span>
        </div>
        <h2 className={styles.title}>O que dizem nossos clientes</h2>
      </div>

      <div className={styles.reviewsGrid}>
        {reviews.map(review => (
          <div key={review.id} className={styles.reviewCard}>
            <div className={styles.cardHeader}>
              <Image src={review.avatar} alt={review.author} width={40} height={40} className={styles.avatar} />
              <div className={styles.authorInfo}>
                <span className={styles.authorName}>{review.author}</span>
                <span className={styles.reviewDate}>{review.date}</span>
              </div>
              <Image src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="G" width={20} height={20} className={styles.gIcon} />
            </div>
            <div className={styles.cardRating}>
              {[...Array(5)].map((_, i) => (
                <span key={i} className={styles.starIcon}>
                  {i < Math.floor(review.rating) ? <FaStar /> : (review.rating % 1 !== 0 && i === Math.floor(review.rating)) ? <FaStarHalfAlt /> : null}
                </span>
              ))}
            </div>
            <p className={styles.reviewText}>{review.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GoogleReviews;
