import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import {Check} from 'lucide-react';

import {cn} from '@/lib/utils';

/**
 * Checkbox com a API do Mistica original: name, checked/defaultChecked,
 * onChange(checked) e children como rotulo clicavel.
 */
type CheckboxProps = {
    name?: string;
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?: (checked: boolean) => void;
    disabled?: boolean;
    /** Rotulo clicavel ao lado do checkbox. */
    children?: React.ReactNode;
    'aria-label'?: string;
    id?: string;
    className?: string;
};

function Checkbox({name, checked, defaultChecked, onChange, disabled, children, id, className, ...aria}: CheckboxProps) {
    const control = (
        <CheckboxPrimitive.Root
            data-slot="checkbox"
            id={id}
            name={name}
            checked={checked}
            defaultChecked={defaultChecked}
            disabled={disabled}
            onCheckedChange={(value) => onChange?.(value === true)}
            className={cn(
                'peer size-5 shrink-0 cursor-pointer rounded-mistica-checkbox border-[1.5px] border-mistica-control bg-transparent transition-colors duration-100 outline-none focus-visible:ring-2 focus-visible:ring-mistica-control-activated focus-visible:ring-offset-2 focus-visible:ring-offset-mistica-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-mistica-control-activated data-[state=checked]:bg-mistica-control-activated',
                className
            )}
            {...aria}
        >
            <CheckboxPrimitive.Indicator
                data-slot="checkbox-indicator"
                className="flex items-center justify-center text-mistica-inverse"
            >
                <Check className="size-3.5" strokeWidth={3} />
            </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
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

export {Checkbox};
