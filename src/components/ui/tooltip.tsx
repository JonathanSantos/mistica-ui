import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

import {cn} from '@/lib/utils';

/** Tooltip Mistica: container claro com sombra e seta, texto text2. */
const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;

function TooltipContent({
    className,
    sideOffset = 8,
    children,
    ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
    return (
        <TooltipPrimitive.Portal>
            <TooltipPrimitive.Content
                data-slot="tooltip-content"
                sideOffset={sideOffset}
                className={cn(
                    'z-50 max-w-xs rounded-lg bg-mistica-background-container px-3 py-2 text-sm text-mistica-text-primary shadow-[0_2px_8px_rgba(0,0,0,0.2)] data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95',
                    className
                )}
                {...props}
            >
                {children}
                <TooltipPrimitive.Arrow className="fill-mistica-background-container drop-shadow-sm" width={12} height={6} />
            </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
    );
}

export {TooltipProvider, Tooltip, TooltipTrigger, TooltipContent};
