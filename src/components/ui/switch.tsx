import * as React from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';

import {cn} from '@/lib/utils';

/**
 * Switch Mistica estilo Android (como o mistica-web renderiza na web):
 * trilho fino (34x14) com knob de 20px sobreposto, usando os tokens
 * toggleAndroid* / control do skin vivo.
 */
function Switch({className, ...props}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
    return (
        <SwitchPrimitive.Root
            data-slot="switch"
            className={cn(
                'group relative inline-flex h-5 w-[34px] shrink-0 cursor-pointer items-center bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-mistica-control-activated focus-visible:ring-offset-2 focus-visible:ring-offset-mistica-background disabled:cursor-not-allowed disabled:opacity-50',
                className
            )}
            {...props}
        >
            <span
                aria-hidden
                className="absolute inset-x-0 top-1/2 h-3.5 -translate-y-1/2 rounded-mistica-bar bg-mistica-control transition-colors duration-150 group-data-[state=checked]:bg-mistica-toggle-android-background-active"
            />
            <SwitchPrimitive.Thumb
                data-slot="switch-thumb"
                className="pointer-events-none relative block size-5 rounded-full bg-mistica-toggle-android-inactive shadow-[0_1px_2px_rgba(0,0,0,0.35)] transition-[translate,background-color] duration-200 ease-out data-[state=checked]:translate-x-3.5 data-[state=checked]:bg-mistica-control-activated"
            />
        </SwitchPrimitive.Root>
    );
}

export {Switch};
