import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import {ChevronDown} from 'lucide-react';

import {cn} from '@/lib/utils';

/** Accordion Mistica: linhas com divider, chevron chevronIndicator. */
const Accordion = AccordionPrimitive.Root;

function AccordionItem({className, ...props}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
    return (
        <AccordionPrimitive.Item
            data-slot="accordion-item"
            className={cn('border-b border-mistica-divider last:border-b-0', className)}
            {...props}
        />
    );
}

function AccordionTrigger({
    className,
    children,
    ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
    return (
        <AccordionPrimitive.Header className="flex">
            <AccordionPrimitive.Trigger
                data-slot="accordion-trigger"
                className={cn(
                    'flex flex-1 cursor-pointer items-center justify-between gap-4 py-4 text-left text-base text-mistica-text-primary outline-none hover:bg-mistica-background-container-hover focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-mistica-control-activated [&[data-state=open]>svg]:rotate-180',
                    className
                )}
                {...props}
            >
                {children}
                <ChevronDown className="size-5 shrink-0 text-mistica-chevron-indicator transition-transform duration-200" />
            </AccordionPrimitive.Trigger>
        </AccordionPrimitive.Header>
    );
}

function AccordionContent({
    className,
    children,
    ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
    return (
        <AccordionPrimitive.Content
            data-slot="accordion-content"
            className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up"
            {...props}
        >
            <div className={cn('pb-4 text-base text-mistica-text-secondary', className)}>{children}</div>
        </AccordionPrimitive.Content>
    );
}

export {Accordion, AccordionItem, AccordionTrigger, AccordionContent};
