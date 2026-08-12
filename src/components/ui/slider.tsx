import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

import {cn} from '@/lib/utils';

/** Slider Mistica: trilho barTrack de 4px, faixa e knob controlActivated. */
function Slider({className, ...props}: React.ComponentProps<typeof SliderPrimitive.Root>) {
    return (
        <SliderPrimitive.Root
            data-slot="slider"
            className={cn(
                'relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50',
                className
            )}
            {...props}
        >
            <SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden rounded-mistica-bar bg-mistica-bar-track">
                <SliderPrimitive.Range className="absolute h-full bg-mistica-control-activated" />
            </SliderPrimitive.Track>
            <SliderPrimitive.Thumb
                data-slot="slider-thumb"
                className="block size-5 cursor-pointer rounded-full bg-mistica-control-activated shadow-[0_1px_3px_rgba(0,0,0,0.3)] transition-transform outline-none hover:scale-110 focus-visible:ring-2 focus-visible:ring-mistica-control-activated focus-visible:ring-offset-2 focus-visible:ring-offset-mistica-background"
            />
        </SliderPrimitive.Root>
    );
}

export {Slider};
