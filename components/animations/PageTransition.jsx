"use client";

import React, { useContext, useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import { TransitionContext } from '../../app/context/TransitionContext';
import styles from './PageTransition.module.css';
import animationData from '../../public/animation.json';

const DESKTOP_SIZE = 418;
const MOBILE_SIZE = 150;

const PageTransition = ({ children }) => {
    const { isTransitioning } = useContext(TransitionContext);
    const [size, setSize] = useState(DESKTOP_SIZE);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setSize(MOBILE_SIZE);
            } else {
                setSize(DESKTOP_SIZE);
            }
        };

        // Set initial size
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            {isTransitioning && (
                <div className={styles.transitionOverlay}>
                    <Lottie
                        animationData={animationData}
                        loop={false}
                        autoplay={true}
                        style={{ width: size, height: size }}
                    />
                </div>
            )}
            {children}
        </>
    );
};

export default PageTransition;
