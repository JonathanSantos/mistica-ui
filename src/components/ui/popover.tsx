import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';

import {cn} from '@/lib/utils';

/** Popover Mistica: container com radius de popup (16px) e sombra. */
const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverAnchor = PopoverPrimitive.Anchor;
const PopoverClose = PopoverPrimitive.Close;

function PopoverContent({
    className,
    align = 'center',
    sideOffset = 8,
    ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
    return (
        <PopoverPrimitive.Portal>
            <PopoverPrimitive.Content
                data-slot="popover-content"
                align={align}
                sideOffset={sideOffset}
                className={cn(
                    'z-50 w-72 rounded-mistica-popup bg-mistica-background-container p-4 text-mistica-text-primary shadow-[0_8px_24px_rgba(0,0,0,0.16)] outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
                    className
                )}
                {...props}
            />
        </PopoverPrimitive.Portal>
    );
}

export {Popover, PopoverTrigger, PopoverAnchor, PopoverClose, PopoverContent};
