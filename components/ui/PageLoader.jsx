'use client';

import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';

export default function PageLoader() {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch('/animation.json')
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error('Error loading animation:', err));
  }, []);

  if (!animationData) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      zIndex: 9999,
    }}>
      <div style={{ width: '300px', maxWidth: '80%', height: 'auto' }}>
        <Lottie animationData={animationData} loop={true} />
      </div>
    </div>
  );
}
