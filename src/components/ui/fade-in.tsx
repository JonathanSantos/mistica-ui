import * as React from 'react';

import {cn} from '@/lib/utils';

/** FadeIn Mistica: entrada suave do conteudo, com atraso opcional. */
type FadeInProps = {
    children: React.ReactNode;
    /** Atraso em ms. */
    delay?: number;
    /** Duracao em ms. */
    duration?: number;
    className?: string;
};

function FadeIn({children, delay = 0, duration = 300, className}: FadeInProps) {
    return (
        <div
            data-slot="fade-in"
            className={cn('animate-in fill-mode-both fade-in', className)}
            style={{animationDelay: `${delay}ms`, animationDuration: `${duration}ms`}}
        >
            {children}
        </div>
    );
}

export {FadeIn};
