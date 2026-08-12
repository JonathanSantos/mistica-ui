import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

import {cn} from '@/lib/utils';

/**
 * RadioGroup / RadioButton com a API do Mistica original:
 * RadioGroup {name, value, defaultValue, onChange(value)} e
 * RadioButton {value, children como rotulo clicavel}.
 */
type RadioGroupProps = {
    name?: string;
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    disabled?: boolean;
    children: React.ReactNode;
    'aria-label'?: string;
    className?: string;
};

function RadioGroup({name, value, defaultValue, onChange, disabled, children, className, ...aria}: RadioGroupProps) {
    return (
        <RadioGroupPrimitive.Root
            data-slot="radio-group"
            name={name}
            value={value}
            defaultValue={defaultValue}
            disabled={disabled}
            onValueChange={(proximo) => onChange?.(proximo)}
            className={cn('grid gap-3', className)}
            {...aria}
        >
            {children}
        </RadioGroupPrimitive.Root>
    );
}

type RadioButtonProps = {
    value: string;
    disabled?: boolean;
    /** Rotulo clicavel ao lado do radio. */
    children?: React.ReactNode;
    'aria-label'?: string;
    id?: string;
    className?: string;
};

function RadioButton({value, disabled, children, id, className, ...aria}: RadioButtonProps) {
    const control = (
        <RadioGroupPrimitive.Item
            data-slot="radio-button"
            id={id}
            value={value}
            disabled={disabled}
            className={cn(
                'aspect-square size-5 shrink-0 cursor-pointer rounded-full border-[1.5px] border-mistica-control bg-transparent transition-colors duration-100 outline-none focus-visible:ring-2 focus-visible:ring-mistica-control-activated focus-visible:ring-offset-2 focus-visible:ring-offset-mistica-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-mistica-control-activated',
                className
            )}
            {...aria}
        >
            <RadioGroupPrimitive.Indicator
                data-slot="radio-button-indicator"
                className="flex size-full items-center justify-center"
            >
                <span className="size-2.5 rounded-full bg-mistica-control-activated" />
            </RadioGroupPrimitive.Indicator>
        </RadioGroupPrimitive.Item>
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

export {RadioGroup, RadioButton};
