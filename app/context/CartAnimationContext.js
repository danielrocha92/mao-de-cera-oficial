'use client';

import React, { createContext, useState, useCallback, useRef } from 'react';

export const CartAnimationContext = createContext();

export const CartAnimationProvider = ({ children }) => {
  const [animationState, setAnimationState] = useState({
    isPlaying: false,
    startRect: null,
    imageSrc: null,
  });
  const endPointRef = useRef(null); // Ref to store the cart icon's position

  const setAnimationEndpoint = useCallback((element) => {
    if (element) {
      endPointRef.current = element;
    }
  }, []);

  const triggerAnimation = useCallback((startRect, imageSrc) => {
    if (endPointRef.current) {
      setAnimationState({
        isPlaying: true,
        startRect,
        imageSrc,
      });
      // Reset after animation duration
      setTimeout(() => {
        setAnimationState({ isPlaying: false, startRect: null, imageSrc: null });
      }, 700); // Animation duration
    }
  }, []);

  const value = {
    triggerAnimation,
    setAnimationEndpoint,
    animationState,
    endPointRef,
  };

  return (
    <CartAnimationContext.Provider value={value}>
      {children}
    </CartAnimationContext.Provider>
  );
};
