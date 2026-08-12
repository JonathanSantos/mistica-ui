import * as React from 'react';

import {cn} from '@/lib/utils';

/** Align Mistica: posiciona o filho no eixo horizontal/vertical do espaco disponivel. */
type AlignProps = {
    horizontal?: 'left' | 'center' | 'right';
    vertical?: 'top' | 'center' | 'bottom';
    /** Ocupa a altura toda do pai (necessario para alinhamento vertical). */
    fullHeight?: boolean;
    children: React.ReactNode;
    className?: string;
};

const H = {left: 'justify-start', center: 'justify-center', right: 'justify-end'};
const V = {top: 'items-start', center: 'items-center', bottom: 'items-end'};

function Align({horizontal = 'left', vertical = 'top', fullHeight = false, children, className}: AlignProps) {
    return (
        <div
            data-slot="align"
            className={cn('flex w-full', H[horizontal], V[vertical], fullHeight && 'h-full', className)}
        >
            {children}
        </div>
    );
}

export {Align};
