import * as React from 'react';

import {cn} from '@/lib/utils';

/** Divider Mistica: linha de 1px com o token divider. */
function Divider({className, ...props}: React.ComponentProps<'hr'>) {
    return (
        <hr
            data-slot="divider"
            className={cn('h-px w-full border-0 bg-mistica-divider', className)}
            {...props}
        />
    );
}

export {Divider};
