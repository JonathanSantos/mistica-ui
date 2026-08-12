import * as React from 'react';

import {cn} from '@/lib/utils';

/**
 * Boxed / NegativeBox Mistica.
 * Boxed: container com borda e radius de container (a "caixa" padrao).
 * NegativeBox: margens horizontais negativas para conteudo full-bleed
 * dentro de containers com padding (listas dentro de cards, por exemplo).
 */
function Boxed({children, className, ...props}: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="boxed"
            className={cn(
                'overflow-hidden rounded-mistica-container border border-mistica-border bg-mistica-background-container',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

function NegativeBox({
    children,
    space = 16,
    className,
    ...props
}: React.ComponentProps<'div'> & {space?: number}) {
    return (
        <div
            data-slot="negative-box"
            className={className}
            style={{marginLeft: -space, marginRight: -space}}
            {...props}
        >
            {children}
        </div>
    );
}

export {Boxed, NegativeBox};
