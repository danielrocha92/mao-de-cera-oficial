"use client";

import React, { createContext, useState, useCallback } from 'react';

export const TransitionContext = createContext();

export const TransitionProvider = ({ children }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const startTransition = useCallback((callback, delayNavigation = false) => {
    if (isTransitioning) return;

    setIsTransitioning(true);

    if (delayNavigation) {
      // Delay navigation for external links to allow animation to play
      setTimeout(() => {
        callback();
      }, 1000); // 1s delay before navigating
    } else {
      // Navigate immediately for internal links
      callback();
    }

    // Hide the animation overlay after it has had time to complete
    setTimeout(() => {
      setIsTransitioning(false);
    }, 2000); // Total animation time
  }, [isTransitioning]);

  return (
    <TransitionContext.Provider value={{ isTransitioning, startTransition }}>
      {children}
    </TransitionContext.Provider>
  );
};
