'use client';

import { useContext, useEffect, useState } from 'react';
import { CartAnimationContext } from '@/app/context/CartAnimationContext';
import styles from './FlyToCart.module.css';

const FlyToCartAnimation = () => {
  const { animationState, endPointRef } = useContext(CartAnimationContext);
  const { isPlaying, startRect, imageSrc } = animationState;
  const [style, setStyle] = useState({});

  useEffect(() => {
    if (isPlaying && startRect && endPointRef.current) {
      const endRect = endPointRef.current.getBoundingClientRect();

      // Start position
      const startX = startRect.left + startRect.width / 2;
      const startY = startRect.top + startRect.height / 2;

      // End position
      const endX = endRect.left + endRect.width / 2;
      const endY = endRect.top + endRect.height / 2;

      setStyle({
        '--start-x': `${startX}px`,
        '--start-y': `${startY}px`,
        '--end-x': `${endX}px`,
        '--end-y': `${endY}px`,
      });
    }
  }, [isPlaying, startRect, endPointRef]);

  if (!isPlaying || !imageSrc) {
    return null;
  }

  return (
    <div className={styles.animationWrapper}>
      <img
        src={imageSrc}
        alt="Produto adicionado ao carrinho"
        className={styles.flyingImage}
        style={style}
      />
    </div>
  );
};

export default FlyToCartAnimation;
