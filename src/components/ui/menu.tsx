import * as React from 'react';
import * as MenuPrimitive from '@radix-ui/react-dropdown-menu';
import {Check} from 'lucide-react';

import {cn} from '@/lib/utils';

/** Menu Mistica (dropdown): container com radius de popup e itens como os do Select. */
const Menu = MenuPrimitive.Root;
const MenuTrigger = MenuPrimitive.Trigger;
const MenuGroup = MenuPrimitive.Group;

function MenuContent({
    className,
    sideOffset = 8,
    align = 'start',
    ...props
}: React.ComponentProps<typeof MenuPrimitive.Content>) {
    return (
        <MenuPrimitive.Portal>
            <MenuPrimitive.Content
                data-slot="menu-content"
                sideOffset={sideOffset}
                align={align}
                className={cn(
                    'z-50 min-w-48 overflow-hidden rounded-mistica-popup bg-mistica-background-container py-2 shadow-[0_8px_24px_rgba(0,0,0,0.16)] data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
                    className
                )}
                {...props}
            />
        </MenuPrimitive.Portal>
    );
}

function MenuItem({
    className,
    destructive = false,
    Icon,
    children,
    ...props
}: React.ComponentProps<typeof MenuPrimitive.Item> & {
    destructive?: boolean;
    Icon?: React.ComponentType<{className?: string}>;
}) {
    return (
        <MenuPrimitive.Item
            data-slot="menu-item"
            className={cn(
                'flex cursor-pointer items-center gap-3 px-4 py-(--mistica-menu-item-padding-y) text-base outline-none select-none focus:bg-mistica-background-container-hover data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:size-5 [&_svg]:shrink-0',
                destructive ? 'text-mistica-text-link-danger' : 'text-mistica-text-primary',
                className
            )}
            {...props}
        >
            {Icon ? <Icon aria-hidden /> : null}
            {children}
        </MenuPrimitive.Item>
    );
}

function MenuCheckboxItem({
    className,
    children,
    ...props
}: React.ComponentProps<typeof MenuPrimitive.CheckboxItem>) {
    return (
        <MenuPrimitive.CheckboxItem
            data-slot="menu-checkbox-item"
            className={cn(
                'flex cursor-pointer items-center justify-between gap-3 px-4 py-(--mistica-menu-item-padding-y) text-base text-mistica-text-primary outline-none select-none focus:bg-mistica-background-container-hover data-[state=checked]:text-mistica-text-activated',
                className
            )}
            {...props}
        >
            {children}
            <MenuPrimitive.ItemIndicator>
                <Check className="size-5 text-mistica-control-activated" strokeWidth={2.5} />
            </MenuPrimitive.ItemIndicator>
        </MenuPrimitive.CheckboxItem>
    );
}

function MenuLabel({className, ...props}: React.ComponentProps<typeof MenuPrimitive.Label>) {
    return (
        <MenuPrimitive.Label
            data-slot="menu-label"
            className={cn('px-4 py-2 text-xs font-medium text-mistica-text-secondary', className)}
            {...props}
        />
    );
}

function MenuSeparator({className, ...props}: React.ComponentProps<typeof MenuPrimitive.Separator>) {
    return (
        <MenuPrimitive.Separator
            data-slot="menu-separator"
            className={cn('my-2 h-px bg-mistica-divider', className)}
            {...props}
        />
    );
}

export {Menu, MenuTrigger, MenuGroup, MenuContent, MenuItem, MenuCheckboxItem, MenuLabel, MenuSeparator};
