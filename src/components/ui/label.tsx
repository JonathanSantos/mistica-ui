import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';

import {cn} from '@/lib/utils';

function Label({className, ...props}: React.ComponentProps<typeof LabelPrimitive.Root>) {
    return (
        <LabelPrimitive.Root
            data-slot="label"
            className={cn(
                'cursor-pointer text-base leading-6 text-mistica-text-primary select-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
                className
            )}
            {...props}
        />
    );
}

export {Label};
