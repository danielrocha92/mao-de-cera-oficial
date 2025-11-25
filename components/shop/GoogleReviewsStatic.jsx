'use client';

import React from 'react';
import Image from 'next/image';
import styles from './GoogleReviewsStatic.module.css';

const staticReviews = [
  {
    author_name: "Ana P. Silva",
    profile_photo_url: "https://lh3.googleusercontent.com/a-/ALV-UjXq0Q5S6L7U4Z7Y9B8A7C6D5E4F3G2H1I0J9K8L7M6N5O4P3Q2R1S0T-Uv=s128-c0x00000000-cc-rp-mo", // Placeholder image
    rating: 5,
    relative_time_description: "há uma semana",
    text: "Velas maravilhosas e de alta qualidade! O cheiro é incrível e a embalagem é um charme. Recomendo muito!",
  },
  {
    author_name: "Bruno M. Costa",
    profile_photo_url: "https://lh3.googleusercontent.com/a-/ALV-UjXq0Q5S6L7U4Z7Y9B8A7C6D5E4F3G2H1I0J9K8L7M6N5O4P3Q2R1S0T-Uv=s128-c0x00000000-cc-rp-mo", // Placeholder image
    rating: 4,
    relative_time_description: "há 2 semanas",
    text: "Adorei a variedade de aromas. A vela de lavanda é perfeita para relaxar. Entrega rápida e produto bem embalado.",
  },
  {
    author_name: "Carla R. Santos",
    profile_photo_url: "https://lh3.googleusercontent.com/a-/ALV-UjXq0Q5S6L7U4Z7Y9B8A7C6D5E4F3G2H1I0J9K8L7M6N5O4P3Q2R1S0T-Uv=s128-c0x00000000-cc-rp-mo", // Placeholder image
    rating: 5,
    relative_time_description: "há 1 mês",
    text: "Experiência de compra excelente. As velas duram bastante e o perfume preenche o ambiente. Comprarei novamente!",
  },
  {
    author_name: "Daniel F. Lima",
    profile_photo_url: "https://lh3.googleusercontent.com/a-/ALV-UjXq0Q5S6L7U4Z7Y9B8A7C6D5E4F3G2H1I0J9K8L7M6N5O4P3Q2R1S0T-Uv=s128-c0x00000000-cc-rp-mo", // Placeholder image
    rating: 5,
    relative_time_description: "há 2 meses",
    text: "Presenteei minha mãe e ela amou! A qualidade das velas é notável. Recomendo a todos que buscam algo especial.",
  },
];

const GoogleReviewsStatic = () => {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < rating ? styles.starFilled : styles.starEmpty}>
          &#9733; {/* Unicode star character */}
        </span>
      );
    }
    return stars;
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>O que nossos clientes dizem</h2>
      <div className={styles.reviewsGrid}>
        {staticReviews.map((review, index) => (
          <div key={index} className={styles.reviewCard}>
            <div className={styles.reviewHeader}>
              <Image
                src={review.profile_photo_url}
                alt={review.author_name}
                width={40}
                height={40}
                className={styles.profilePhoto}
              />
              <div className={styles.authorInfo}>
                <p className={styles.authorName}>{review.author_name}</p>
                <div className={styles.stars}>{renderStars(review.rating)}</div>
              </div>
            </div>
            <p className={styles.reviewText}>{review.text}</p>
            <p className={styles.reviewTime}>{review.relative_time_description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GoogleReviewsStatic;