import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import {X} from 'lucide-react';

import {cn} from '@/lib/utils';
import {Text} from '@/components/ui/text';

/**
 * Dialog Mistica: modal centrado com radius de popup (16px), overlay
 * backgroundOverlay e botoes alinhados a direita. Comportamento Radix/shadcn.
 */
const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogClose = DialogPrimitive.Close;
const DialogPortal = DialogPrimitive.Portal;

function DialogOverlay({className, ...props}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
    return (
        <DialogPrimitive.Overlay
            data-slot="dialog-overlay"
            className={cn(
                'fixed inset-0 z-50 bg-mistica-background-overlay data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
                className
            )}
            {...props}
        />
    );
}

function DialogContent({
    className,
    children,
    showClose = true,
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {showClose?: boolean}) {
    return (
        <DialogPortal>
            <DialogOverlay />
            <DialogPrimitive.Content
                data-slot="dialog-content"
                className={cn(
                    'fixed top-1/2 left-1/2 z-50 grid w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 gap-4 rounded-mistica-popup bg-mistica-background-container p-6 shadow-[0_8px_24px_rgba(0,0,0,0.16)] outline-none duration-200 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 lg:p-8',
                    className
                )}
                {...props}
            >
                {children}
                {showClose ? (
                    <DialogPrimitive.Close
                        aria-label="Fechar"
                        className="absolute top-4 right-4 cursor-pointer rounded-full p-2 text-mistica-neutral-high outline-none hover:bg-mistica-background-container-hover focus-visible:ring-2 focus-visible:ring-mistica-control-activated"
                    >
                        <X className="size-5" />
                    </DialogPrimitive.Close>
                ) : null}
            </DialogPrimitive.Content>
        </DialogPortal>
    );
}

function DialogHeader({className, ...props}: React.ComponentProps<'div'>) {
    return <div data-slot="dialog-header" className={cn('grid gap-2 pr-8', className)} {...props} />;
}

function DialogTitle({className, children}: {className?: string; children: React.ReactNode}) {
    return (
        <DialogPrimitive.Title asChild>
            <Text as="h2" preset="title3" className={className}>
                {children}
            </Text>
        </DialogPrimitive.Title>
    );
}

function DialogDescription({className, children}: {className?: string; children: React.ReactNode}) {
    return (
        <DialogPrimitive.Description asChild>
            <Text as="p" preset="text2" color="secondary" className={className}>
                {children}
            </Text>
        </DialogPrimitive.Description>
    );
}

function DialogFooter({className, ...props}: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="dialog-footer"
            className={cn('mt-2 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end', className)}
            {...props}
        />
    );
}

export {
    Dialog,
    DialogTrigger,
    DialogClose,
    DialogPortal,
    DialogOverlay,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
};
