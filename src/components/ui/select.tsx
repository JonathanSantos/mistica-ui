import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import {Check, ChevronDown} from 'lucide-react';

import {cn} from '@/lib/utils';
import {FieldHelperText} from '@/components/ui/text-field';

/**
 * Select Mistica: API identica ao original ({label, options, onChangeValue...})
 * sobre Radix. A composicao interna nao e exportada — a API publica e o Select.
 */
const SelectRoot = SelectPrimitive.Root;
const SelectValue = SelectPrimitive.Value;

function SelectTrigger({
    className,
    label,
    error,
    children,
    ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {label?: string; error?: boolean}) {
    return (
        <SelectPrimitive.Trigger
            data-slot="select-trigger"
            aria-invalid={error || undefined}
            className={cn(
                'group relative flex h-(--mistica-height-field) w-full cursor-pointer items-center gap-2 rounded-mistica-input border bg-mistica-background-container pr-11 pl-4 text-left text-base text-mistica-text-primary transition-[border-color,box-shadow] duration-150 outline-none disabled:cursor-not-allowed disabled:opacity-50',
                error
                    ? 'border-mistica-control-error focus:shadow-[inset_0_0_0_1px_var(--mistica-control-error)]'
                    : 'border-mistica-input-border focus:border-mistica-control-activated focus:shadow-[inset_0_0_0_1px_var(--mistica-control-activated)]',
                label && 'pt-5 pb-1',
                className
            )}
            {...props}
        >
            {label ? (
                <span
                    aria-hidden
                    className="pointer-events-none absolute left-4 top-2 text-xs text-mistica-text-secondary transition-all duration-150 group-focus:text-mistica-control-activated group-data-[placeholder]:top-1/2 group-data-[placeholder]:-translate-y-1/2 group-data-[placeholder]:text-base"
                >
                    {label}
                </span>
            ) : null}
            <span className="min-w-0 flex-1 truncate group-data-[placeholder]:text-transparent">{children}</span>
            <SelectPrimitive.Icon asChild>
                <ChevronDown className="absolute top-1/2 right-4 size-5 shrink-0 -translate-y-1/2 text-mistica-chevron-indicator transition-transform duration-150 group-data-[state=open]:rotate-180" />
            </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
    );
}

function SelectContent({
    className,
    children,
    position = 'popper',
    ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
    return (
        <SelectPrimitive.Portal>
            <SelectPrimitive.Content
                data-slot="select-content"
                position={position}
                sideOffset={8}
                className={cn(
                    'relative z-50 max-h-[min(24rem,var(--radix-select-content-available-height))] min-w-[var(--radix-select-trigger-width)] overflow-y-auto rounded-mistica-popup bg-mistica-background-container py-2 shadow-[0_8px_24px_rgba(0,0,0,0.16)]',
                    'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
                    className
                )}
                {...props}
            >
                <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
            </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
    );
}

function SelectItem({className, children, ...props}: React.ComponentProps<typeof SelectPrimitive.Item>) {
    return (
        <SelectPrimitive.Item
            data-slot="select-item"
            className={cn(
                'flex cursor-pointer items-center justify-between gap-3 px-4 py-(--mistica-menu-item-padding-y) text-base text-mistica-text-primary outline-none select-none hover:bg-mistica-background-container-hover focus:bg-mistica-background-container-hover active:bg-mistica-background-container-pressed data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[state=checked]:text-mistica-text-activated',
                className
            )}
            {...props}
        >
            <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
            <SelectPrimitive.ItemIndicator>
                <Check className="size-5 text-mistica-control-activated" strokeWidth={2.5} />
            </SelectPrimitive.ItemIndicator>
        </SelectPrimitive.Item>
    );
}

/** API identica ao Select do Mistica original. */
type SelectProps = {
    label: string;
    options: ReadonlyArray<{value: string; text: string}>;
    value?: string;
    defaultValue?: string;
    onChangeValue?: (value: string) => void;
    helperText?: string;
    error?: boolean;
    optional?: boolean;
    disabled?: boolean;
    name?: string;
    className?: string;
};

function Select({
    label,
    options,
    value,
    defaultValue,
    onChangeValue,
    helperText,
    error,
    optional,
    disabled,
    name,
    className,
}: SelectProps) {
    const id = React.useId();

    return (
        <div data-slot="select" className={cn('w-full min-w-0', className)}>
            <SelectRoot
                name={name}
                value={value}
                defaultValue={defaultValue}
                onValueChange={onChangeValue}
                disabled={disabled}
            >
                <SelectTrigger label={optional ? `${label} (opcional)` : label} error={error}>
                    <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.text}
                        </SelectItem>
                    ))}
                </SelectContent>
            </SelectRoot>
            {helperText ? (
                <FieldHelperText id={`${id}-helper`} error={error}>
                    {helperText}
                </FieldHelperText>
            ) : null}
        </div>
    );
}

export {Select};
