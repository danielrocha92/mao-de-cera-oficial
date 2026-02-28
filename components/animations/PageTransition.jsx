"use client";

import React, { useContext } from 'react';
import { TransitionContext } from '../../app/context/TransitionContext';
import styles from './PageTransition.module.css';

const PageTransition = ({ children }) => {
    const { isTransitioning } = useContext(TransitionContext);

    return (
        <>
            {isTransitioning && (
                <div className={styles.transitionOverlay} style={{
                    display: 'flex', justifyContent: 'center', alignItems: 'center'
                }}>
                    <div style={{
                        width: '50px',
                        height: '50px',
                        border: '4px solid #f3f3f3',
                        borderTop: '4px solid #9b59b6',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                    }} />
                    <style>{`
                        @keyframes spin {
                            0% { transform: rotate(0deg); }
                            100% { transform: rotate(360deg); }
                        }
                    `}</style>
                </div>
            )}
            {children}
        </>
    );
};

export default PageTransition;
