import * as React from 'react';

import {cn} from '@/lib/utils';

/** HorizontalScroll Mistica: linha com rolagem horizontal (scrollbar oculta). */
type HorizontalScrollProps = {
    children: React.ReactNode;
    /** Espaco entre itens (px). */
    space?: number;
    /** Alinha itens por snap ao rolar. */
    snap?: boolean;
    className?: string;
};

function HorizontalScroll({children, space = 16, snap = false, className}: HorizontalScrollProps) {
    return (
        <div
            data-slot="horizontal-scroll"
            className={cn(
                'flex overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
                snap && 'snap-x snap-mandatory [&>*]:snap-start',
                '[&>*]:shrink-0',
                className
            )}
            style={{gap: space}}
        >
            {children}
        </div>
    );
}

export {HorizontalScroll};
