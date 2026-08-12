import * as React from 'react';
import {cva, type VariantProps} from 'class-variance-authority';

import {cn} from '@/lib/utils';

/**
 * Skeleton Mistica: variantes line/text/circle/rectangle com o token
 * backgroundSkeleton e animacao de pulso.
 */
const skeletonVariants = cva('animate-pulse bg-mistica-background-skeleton', {
    variants: {
        variant: {
            line: 'h-2 w-full rounded-mistica-bar',
            circle: 'size-10 rounded-full',
            rectangle: 'h-24 w-full rounded-mistica-media-small',
        },
    },
    defaultVariants: {
        variant: 'line',
    },
});

function Skeleton({
    className,
    variant,
    ...props
}: React.ComponentProps<'div'> & VariantProps<typeof skeletonVariants>) {
    return (
        <div
            data-slot="skeleton"
            aria-hidden
            className={cn(skeletonVariants({variant, className}))}
            {...props}
        />
    );
}

/** Bloco de texto: varias linhas, a ultima mais curta (como o SkeletonText do Mistica). */
function SkeletonText({lines = 3, className}: {lines?: number; className?: string}) {
    return (
        <div data-slot="skeleton-text" aria-hidden className={cn('grid gap-2', className)}>
            {Array.from({length: lines}, (_, i) => (
                <Skeleton key={i} variant="line" className={i === lines - 1 ? 'w-3/4' : undefined} />
            ))}
        </div>
    );
}

export {Skeleton, SkeletonText};
