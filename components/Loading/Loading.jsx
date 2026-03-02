'use client';

import React from 'react';
import Lottie from 'lottie-react';
import animationData from '@/public/animation.json';
import styles from './Loading.module.css';

const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.lottieWrapper}>
        <Lottie
          animationData={animationData}
          loop={true}
          style={{ width: 250, height: 250 }}
        />
      </div>
    </div>
  );
};

export default Loading;