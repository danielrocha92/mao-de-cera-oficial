"use client";

import React, { useContext, forwardRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { TransitionContext } from '../../app/context/TransitionContext';

const CustomLink = forwardRef(({ href, children, onClick: onClickFromParent, ...props }, ref) => {
    const router = useRouter();
    const { startTransition } = useContext(TransitionContext);

    const isExternal = href.startsWith('http');

    const handleClick = (e) => {
        // Allow default behavior for new tab/window clicks
        if (e.ctrlKey || e.metaKey) {
            return;
        }
        
        e.preventDefault();
        
        if (isExternal) {
            startTransition(() => {
                window.open(href, '_blank', 'noopener,noreferrer');
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
            <a href={href} onClick={handleClick} target="_blank" rel="noopener noreferrer" ref={ref} {...props}>
                {children}
            </a>
        );
    }

    return (
        <Link href={href} onClick={handleClick} ref={ref} {...props}>
            {children}
        </Link>
    );
});

CustomLink.displayName = 'CustomLink';

export default CustomLink;

