import * as React from 'react';

import {cn} from '@/lib/utils';

/**
 * UnorderedList / OrderedList Mistica: listas tipograficas com marcadores
 * na cor da marca e espacamento do design system. Filhos: <li> comuns.
 */
function UnorderedList({children, className, ...props}: React.ComponentProps<'ul'>) {
    return (
        <ul
            data-slot="unordered-list"
            className={cn(
                'grid list-disc gap-2 pl-5 text-base text-mistica-text-primary marker:text-mistica-control-activated',
                className
            )}
            {...props}
        >
            {children}
        </ul>
    );
}

function OrderedList({children, className, ...props}: React.ComponentProps<'ol'>) {
    return (
        <ol
            data-slot="ordered-list"
            className={cn(
                'grid list-decimal gap-2 pl-5 text-base text-mistica-text-primary marker:font-medium marker:text-mistica-control-activated',
                className
            )}
            {...props}
        >
            {children}
        </ol>
    );
}

export {UnorderedList, OrderedList};
