import * as React from 'react';
import * as SheetPrimitive from '@radix-ui/react-dialog';

import {cn} from '@/lib/utils';

/**
 * Sheet Mistica: bottom sheet com alca de arrastar no mobile e, como no
 * mistica-web, modal centrado no desktop (>=1024px). Os lados right/left
 * continuam paineis laterais em qualquer tamanho. Comportamento Radix.
 */
const Sheet = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;
const SheetClose = SheetPrimitive.Close;

function SheetContent({
    className,
    children,
    side = 'bottom',
    ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {side?: 'bottom' | 'right' | 'left'}) {
    return (
        <SheetPrimitive.Portal>
            <SheetPrimitive.Overlay
                data-slot="sheet-overlay"
                className="fixed inset-0 z-50 bg-mistica-background-overlay data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0"
            />
            <SheetPrimitive.Content
                data-slot="sheet-content"
                className={cn(
                    'fixed z-50 flex flex-col bg-mistica-background-container outline-none transition data-[state=open]:animate-in data-[state=closed]:animate-out',
                    side === 'bottom' &&
                        'inset-x-0 bottom-0 max-h-[85vh] rounded-t-mistica-sheet data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom lg:inset-0 lg:m-auto lg:h-fit lg:w-[calc(100%-2rem)] lg:max-w-md lg:rounded-mistica-popup lg:data-[state=open]:slide-in-from-bottom-0 lg:data-[state=open]:zoom-in-95 lg:data-[state=open]:fade-in-0 lg:data-[state=closed]:slide-out-to-bottom-0 lg:data-[state=closed]:zoom-out-95 lg:data-[state=closed]:fade-out-0',
                    side === 'right' &&
                        'inset-y-0 right-0 w-full max-w-sm data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right',
                    side === 'left' &&
                        'inset-y-0 left-0 w-full max-w-sm data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left',
                    className
                )}
                {...props}
            >
                {side === 'bottom' ? (
                    <div className="flex justify-center pt-2 pb-1 lg:hidden" aria-hidden>
                        <div className="h-1 w-8 rounded-mistica-bar bg-mistica-bar-track" />
                    </div>
                ) : null}
                <div className="overflow-y-auto p-4 pb-6 lg:p-6">{children}</div>
            </SheetPrimitive.Content>
        </SheetPrimitive.Portal>
    );
}

const SheetTitle = SheetPrimitive.Title;
const SheetDescription = SheetPrimitive.Description;

export {Sheet, SheetTrigger, SheetClose, SheetContent, SheetTitle, SheetDescription};
