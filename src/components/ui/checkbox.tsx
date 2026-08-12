import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import {Check} from 'lucide-react';

import {cn} from '@/lib/utils';

/** Checkbox Mistica (radius 4px, controlActivated) sobre Radix. */
function Checkbox({className, ...props}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
    return (
        <CheckboxPrimitive.Root
            data-slot="checkbox"
            className={cn(
                'peer size-5 shrink-0 cursor-pointer rounded-mistica-checkbox border-[1.5px] border-mistica-control bg-transparent transition-colors duration-100 outline-none focus-visible:ring-2 focus-visible:ring-mistica-control-activated focus-visible:ring-offset-2 focus-visible:ring-offset-mistica-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-mistica-control-activated data-[state=checked]:bg-mistica-control-activated',
                className
            )}
            {...props}
        >
            <CheckboxPrimitive.Indicator
                data-slot="checkbox-indicator"
                className="flex items-center justify-center text-mistica-inverse"
            >
                <Check className="size-3.5" strokeWidth={3} />
            </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
    );
}

export {Checkbox};
