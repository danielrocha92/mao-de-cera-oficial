"use client";

import React, { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { TransitionContext } from '../../app/context/TransitionContext';

const CustomLink = ({ href, children, ...props }) => {
    const router = useRouter();
    const { startTransition } = useContext(TransitionContext);

    const handleClick = (e) => {
        e.preventDefault();
        startTransition(() => {
            router.push(href);
        });
    };

    return (
        <Link href={href} onClick={handleClick} {...props}>
            {children}
        </Link>
    );
};

export default CustomLink;
