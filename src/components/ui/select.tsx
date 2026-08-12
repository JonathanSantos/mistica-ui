import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import {Check, ChevronDown} from 'lucide-react';

import {cn} from '@/lib/utils';

/**
 * Select Mistica: trigger com o mesmo frame de campo do TextField
 * (56px, radius de input, label flutuante) e menu com radius de popup.
 * Comportamento Radix/shadcn.
 */
const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

function SelectTrigger({
    className,
    label,
    children,
    ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {label?: string}) {
    return (
        <SelectPrimitive.Trigger
            data-slot="select-trigger"
            className={cn(
                'group relative flex h-(--mistica-height-field) w-full cursor-pointer items-center gap-2 rounded-mistica-input border border-mistica-input-border bg-mistica-background-container pr-11 pl-4 text-left text-base text-mistica-text-primary transition-[border-color,box-shadow] duration-150 outline-none focus:border-mistica-control-activated focus:shadow-[inset_0_0_0_1px_var(--mistica-control-activated)] disabled:cursor-not-allowed disabled:opacity-50',
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

function SelectLabel({className, ...props}: React.ComponentProps<typeof SelectPrimitive.Label>) {
    return (
        <SelectPrimitive.Label
            data-slot="select-label"
            className={cn('px-4 py-2 text-xs font-medium text-mistica-text-secondary', className)}
            {...props}
        />
    );
}

function SelectSeparator({className, ...props}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
    return (
        <SelectPrimitive.Separator
            data-slot="select-separator"
            className={cn('my-2 h-px bg-mistica-divider', className)}
            {...props}
        />
    );
}

export {Select, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectItem, SelectLabel, SelectSeparator};
