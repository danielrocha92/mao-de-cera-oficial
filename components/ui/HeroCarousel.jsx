'use client';

import { useState, useEffect, useCallback } from 'react';
import styles from './HeroCarousel.module.css';

const HeroCarousel = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = useCallback(() => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, slides]);

  const goToNext = useCallback(() => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, slides]);

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  // Optional: Auto-play functionality
  useEffect(() => {
    const timer = setTimeout(() => {
      goToNext();
    }, 5000); // Change slide every 5 seconds
    return () => clearTimeout(timer);
  }, [currentIndex, goToNext]);

  return (
    <div className={styles.carouselWrapper}>
      <div className={styles.slidesContainer} style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {slides.map((slide, index) => (
          <div className={styles.slide} key={index}>
            {slide.type === 'video' ? (
              <video
                src={slide.src}
                autoPlay
                muted
                loop
                playsInline
                className={styles.slideMedia}
              />
            ) : (
              <img
                src={slide.src}
                alt={slide.alt || `Slide ${index + 1}`}
                className={styles.slideMedia}
              />
            )}
            <div className={styles.slideOverlay}></div>
            <div className={styles.slideContent}>
              <h2>{slide.title}</h2>
              <p>{slide.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      <button className={`${styles.arrow} ${styles.leftArrow}`} onClick={goToPrevious}>&#10094;</button>
      <button className={`${styles.arrow} ${styles.rightArrow}`} onClick={goToNext}>&#10095;</button>

      <div className={styles.dotsContainer}>
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            className={`${styles.dot} ${currentIndex === slideIndex ? styles.activeDot : ''}`}
            onClick={() => goToSlide(slideIndex)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
