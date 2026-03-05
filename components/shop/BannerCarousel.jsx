'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './BannerCarousel.module.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function BannerCarousel({ banners }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef(null);
  const autoplayRef = useRef(null);

  const startAutoplay = useCallback(() => {
    if (banners.length <= 1) return;
    stopAutoplay();
    autoplayRef.current = setInterval(() => {
        if (scrollRef.current) {
            const nextIndex = (currentIndex + 1) % banners.length;
            const scrollWidth = scrollRef.current.clientWidth;
            scrollRef.current.scrollTo({
                left: nextIndex * scrollWidth,
                behavior: 'smooth'
            });
            setCurrentIndex(nextIndex);
        }
    }, 6000); // 6 seconds
  }, [currentIndex, banners.length]);

  const stopAutoplay = () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
  };

  useEffect(() => {
     startAutoplay();
     return () => stopAutoplay();
  }, [startAutoplay]);

  if (!banners || banners.length === 0) return null;

  const scrollTo = (index) => {
    if (scrollRef.current) {
        const scrollWidth = scrollRef.current.clientWidth;
        scrollRef.current.scrollTo({
            left: index * scrollWidth,
            behavior: 'smooth'
        });
        setCurrentIndex(index);
        startAutoplay(); // restart autoplay timer
    }
  };

  const nextSlide = () => {
      const nextIndex = (currentIndex + 1) % banners.length;
      scrollTo(nextIndex);
  };

  const prevSlide = () => {
      const prevIndex = (currentIndex - 1 + banners.length) % banners.length;
      scrollTo(prevIndex);
  };

  // Update current index on manual scroll (for native swipe)
  const handleScroll = () => {
      if (scrollRef.current) {
         const scrollLeft = scrollRef.current.scrollLeft;
         const width = scrollRef.current.clientWidth;
         const newIndex = Math.round(scrollLeft / width);
         if (newIndex !== currentIndex) {
             setCurrentIndex(newIndex);
         }
      }
  };

  return (
    <div
        className={styles.carouselContainer}
        onMouseEnter={stopAutoplay}
        onMouseLeave={startAutoplay}
    >
       <div
          className={styles.carouselTrack}
          ref={scrollRef}
          onScroll={handleScroll}
       >
          {banners.map((banner, index) => (
             <div key={banner.id || index} className={styles.carouselSlide}>
                 {banner.tipo === 'video' ? (
                  <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      className={styles.mediaBackground}
                  >
                      <source src={banner.mediaUrl} type="video/mp4" />
                  </video>
                 ) : (
                  <Image
                    src={banner.mediaUrl}
                    alt={banner.titulo || 'Banner'}
                    fill
                    priority={index === 0}
                    style={{ objectFit: 'cover' }}
                    className={styles.mediaBackground}
                  />
                 )}
                 <div className={styles.heroOverlay}></div>

                 <div className={`${styles.heroContent} ${currentIndex === index ? styles.activeContent : ''}`}>
                     {banner.titulo && <h1>{banner.titulo}</h1>}
                     {banner.descricao && <p>{banner.descricao}</p>}
                     {banner.link && banner.textoBotao && (
                        <Link href={banner.link} className={styles.ctaButton}>
                            {banner.textoBotao}
                        </Link>
                     )}
                 </div>
             </div>
          ))}
       </div>

       {banners.length > 1 && (
           <>
              <button
                  className={`${styles.navButton} ${styles.prevButton}`}
                  onClick={prevSlide}
                  aria-label="Anterior"
              >
                 <FaChevronLeft />
              </button>
              <button
                  className={`${styles.navButton} ${styles.nextButton}`}
                  onClick={nextSlide}
                  aria-label="Próximo"
              >
                  <FaChevronRight />
              </button>
              <div className={styles.indicators}>
                  {banners.map((_, index) => (
                      <button
                          key={index}
                          className={`${styles.indicator} ${index === currentIndex ? styles.activeIndicator : ''}`}
                          onClick={() => scrollTo(index)}
                          aria-label={`Ir para o banner ${index + 1}`}
                      />
                  ))}
              </div>
           </>
       )}
    </div>
  );
}
