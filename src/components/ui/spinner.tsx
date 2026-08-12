import * as React from 'react';

import {cn} from '@/lib/utils';

/** Spinner Mistica: circular, cor controlActivated (ou currentColor). */
function Spinner({
    className,
    size = 24,
    ...props
}: React.ComponentProps<'svg'> & {size?: number}) {
    return (
        <svg
            data-slot="spinner"
            role="progressbar"
            aria-label="Carregando"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            className={cn('animate-spin text-mistica-control-activated', className)}
            {...props}
        >
            <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="46"
                strokeDashoffset="16"
            />
        </svg>
    );
}

export {Spinner};
