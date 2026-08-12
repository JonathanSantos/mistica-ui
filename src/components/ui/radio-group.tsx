import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

import {cn} from '@/lib/utils';

/** RadioButton Mistica (borda control, marcado com controlActivated) sobre Radix. */
function RadioGroup({className, ...props}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
    return (
        <RadioGroupPrimitive.Root
            data-slot="radio-group"
            className={cn('grid gap-3', className)}
            {...props}
        />
    );
}

function RadioGroupItem({
    className,
    ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
    return (
        <RadioGroupPrimitive.Item
            data-slot="radio-group-item"
            className={cn(
                'aspect-square size-5 shrink-0 cursor-pointer rounded-full border-[1.5px] border-mistica-control bg-transparent transition-colors duration-100 outline-none focus-visible:ring-2 focus-visible:ring-mistica-control-activated focus-visible:ring-offset-2 focus-visible:ring-offset-mistica-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-mistica-control-activated',
                className
            )}
            {...props}
        >
            <RadioGroupPrimitive.Indicator
                data-slot="radio-group-indicator"
                className="flex size-full items-center justify-center"
            >
                <span className="size-2.5 rounded-full bg-mistica-control-activated" />
            </RadioGroupPrimitive.Indicator>
        </RadioGroupPrimitive.Item>
    );
}

export {RadioGroup, RadioGroupItem};
