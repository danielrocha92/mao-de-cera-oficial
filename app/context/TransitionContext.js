"use client";

import React, { createContext, useState, useCallback } from 'react';

export const TransitionContext = createContext();

export const TransitionProvider = ({ children }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const startTransition = useCallback((callback) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      callback();
      setTimeout(() => {
        setIsTransitioning(false);
      }, 1000);
    }, 1000);
  }, [isTransitioning]);

  return (
    <TransitionContext.Provider value={{ isTransitioning, startTransition }}>
      {children}
    </TransitionContext.Provider>
  );
};
