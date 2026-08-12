import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

import {cn} from '@/lib/utils';

/**
 * Tabs Mistica: labels com o preset tabsLabel (18px medium), item ativo
 * com texto textActivated e indicador controlActivated de 2px.
 */
const Tabs = TabsPrimitive.Root;

function TabsList({className, ...props}: React.ComponentProps<typeof TabsPrimitive.List>) {
    return (
        <TabsPrimitive.List
            data-slot="tabs-list"
            className={cn(
                'flex w-full items-stretch gap-2 overflow-x-auto border-b border-mistica-divider',
                className
            )}
            {...props}
        />
    );
}

function TabsTrigger({className, ...props}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
    return (
        <TabsPrimitive.Trigger
            data-slot="tabs-trigger"
            className={cn(
                'relative inline-flex h-(--mistica-height-tabs) shrink-0 cursor-pointer items-center justify-center gap-2 px-3 font-medium whitespace-nowrap text-mistica-text-secondary transition-colors outline-none hover:text-mistica-text-primary focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-mistica-control-activated data-[state=active]:text-mistica-text-activated',
                'after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:rounded-mistica-bar after:bg-transparent data-[state=active]:after:bg-mistica-control-activated',
                className
            )}
            style={{fontSize: 'var(--mistica-text-size-tabs-label)', lineHeight: 'var(--mistica-text-line-height-tabs-label)'}}
            {...props}
        />
    );
}

function TabsContent({className, ...props}: React.ComponentProps<typeof TabsPrimitive.Content>) {
    return (
        <TabsPrimitive.Content
            data-slot="tabs-content"
            className={cn('mt-6 outline-none', className)}
            {...props}
        />
    );
}

export {Tabs, TabsList, TabsTrigger, TabsContent};
