"use client";

import React, { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { TransitionContext } from '../../app/context/TransitionContext';

const CustomLink = ({ href, children, onClick: onClickFromParent, ...props }) => {
    const router = useRouter();
    const { startTransition } = useContext(TransitionContext);

    const isExternal = href.startsWith('http');

    const handleClick = (e) => {
        e.preventDefault();
        
        if (isExternal) {
            startTransition(() => {
                window.location.href = href;
            }, true); // Delay navigation for external links
        } else {
            startTransition(() => {
                router.push(href);
            }, false); // Navigate immediately for internal links
        }

        // If an onClick handler was passed from the parent, call it.
        if (onClickFromParent) {
            onClickFromParent(e);
        }
    };

    if (isExternal) {
        return (
            <a href={href} onClick={handleClick} target="_blank" rel="noopener noreferrer" {...props}>
                {children}
            </a>
        );
    }

    return (
        <Link href={href} onClick={handleClick} {...props}>
            {children}
        </Link>
    );
};

export default CustomLink;
