"use client";

import React, { useContext } from 'react';
import Lottie from 'lottie-react';
import { TransitionContext } from '../../app/context/TransitionContext';
import styles from './PageTransition.module.css';
import animationData from '../../public/animation.json';

const PageTransition = ({ children }) => {
    const { isTransitioning } = useContext(TransitionContext);

    return (
        <>
            {isTransitioning && (
                <div className={styles.transitionOverlay}>
                    <Lottie
                        animationData={animationData}
                        loop={false}
                        autoplay={true}
                        style={{ width: 418, height: 418 }}
                    />
                </div>
            )}
            {children}
        </>
    );
};

export default PageTransition;
