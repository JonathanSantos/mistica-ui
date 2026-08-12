import * as React from 'react';

import {cn} from '@/lib/utils';

/**
 * DoubleField Mistica: dois campos lado a lado (empilha no mobile).
 */
function DoubleField({children, className, ...props}: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="double-field"
            className={cn('grid grid-cols-1 gap-4 sm:grid-cols-2', className)}
            {...props}
        >
            {children}
        </div>
    );
}

export {DoubleField};
