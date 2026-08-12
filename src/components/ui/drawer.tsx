import * as React from 'react';
import * as DrawerPrimitive from '@radix-ui/react-dialog';
import {X} from 'lucide-react';

import {cn} from '@/lib/utils';
import {Text} from '@/components/ui/text';

/**
 * Drawer Mistica: painel lateral direito com paddings de drawer do skin
 * (32/40 topo, 16/40 laterais) e titulo com preset drawerTitle.
 * Comportamento Radix Dialog.
 */
const Drawer = DrawerPrimitive.Root;
const DrawerTrigger = DrawerPrimitive.Trigger;
const DrawerClose = DrawerPrimitive.Close;

function DrawerContent({
    className,
    children,
    ...props
}: React.ComponentProps<typeof DrawerPrimitive.Content>) {
    return (
        <DrawerPrimitive.Portal>
            <DrawerPrimitive.Overlay
                data-slot="drawer-overlay"
                className="fixed inset-0 z-50 bg-mistica-background-overlay data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0"
            />
            <DrawerPrimitive.Content
                data-slot="drawer-content"
                className={cn(
                    'fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-mistica-background-container outline-none data-[state=open]:animate-in data-[state=open]:slide-in-from-right data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right',
                    className
                )}
                {...props}
            >
                <div className="flex flex-1 flex-col overflow-y-auto px-4 pt-8 pb-4 lg:px-10 lg:pt-10 lg:pb-6">
                    {children}
                </div>
                <DrawerPrimitive.Close
                    aria-label="Fechar"
                    className="absolute top-4 right-4 cursor-pointer rounded-full p-2 text-mistica-neutral-high outline-none hover:bg-mistica-background-container-hover focus-visible:ring-2 focus-visible:ring-mistica-control-activated"
                >
                    <X className="size-5" />
                </DrawerPrimitive.Close>
            </DrawerPrimitive.Content>
        </DrawerPrimitive.Portal>
    );
}

function DrawerTitle({className, children}: {className?: string; children: React.ReactNode}) {
    return (
        <DrawerPrimitive.Title asChild>
            <Text as="h2" preset="drawer-title" weight="medium" className={cn('pr-8', className)}>
                {children}
            </Text>
        </DrawerPrimitive.Title>
    );
}

function DrawerDescription({className, children}: {className?: string; children: React.ReactNode}) {
    return (
        <DrawerPrimitive.Description asChild>
            <Text as="p" preset="text2" color="secondary" className={cn('mt-2', className)}>
                {children}
            </Text>
        </DrawerPrimitive.Description>
    );
}

function DrawerBody({className, ...props}: React.ComponentProps<'div'>) {
    return <div data-slot="drawer-body" className={cn('mt-6 flex-1', className)} {...props} />;
}

function DrawerFooter({className, ...props}: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="drawer-footer"
            className={cn('mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end', className)}
            {...props}
        />
    );
}

export {Drawer, DrawerTrigger, DrawerClose, DrawerContent, DrawerTitle, DrawerDescription, DrawerBody, DrawerFooter};
