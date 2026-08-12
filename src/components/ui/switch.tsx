import * as React from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';

import {cn} from '@/lib/utils';

/**
 * Switch estilo Android (como o mistica-web renderiza), com a API do
 * Mistica original: name, checked/defaultChecked, onChange(checked) e
 * children como rotulo clicavel.
 */
type SwitchProps = {
    name?: string;
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?: (checked: boolean) => void;
    disabled?: boolean;
    /** Rotulo clicavel ao lado do switch. */
    children?: React.ReactNode;
    'aria-label'?: string;
    id?: string;
    className?: string;
};

function Switch({name, checked, defaultChecked, onChange, disabled, children, id, className, ...aria}: SwitchProps) {
    const control = (
        <SwitchPrimitive.Root
            data-slot="switch"
            id={id}
            name={name}
            checked={checked}
            defaultChecked={defaultChecked}
            disabled={disabled}
            onCheckedChange={(value) => onChange?.(value)}
            className={cn(
                'group relative inline-flex h-5 w-[34px] shrink-0 cursor-pointer items-center bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-mistica-control-activated focus-visible:ring-offset-2 focus-visible:ring-offset-mistica-background disabled:cursor-not-allowed disabled:opacity-50',
                className
            )}
            {...aria}
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

    if (!children) {
        return control;
    }

    return (
        <label className="flex cursor-pointer items-center gap-3 text-base text-mistica-text-primary select-none">
            {control}
            {children}
        </label>
    );
}

export {Switch};
