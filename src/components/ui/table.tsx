import * as React from 'react';

import {cn} from '@/lib/utils';

/**
 * Table Mistica: cabecalho em textSecondary, linhas com divider,
 * variante boxed (container com radius). Estrutura shadcn (Table/Header/Body/...).
 */
function Table({
    className,
    boxed = true,
    ...props
}: React.ComponentProps<'table'> & {boxed?: boolean}) {
    const table = (
        <div className="w-full overflow-x-auto">
            <table
                data-slot="table"
                className={cn('w-full caption-bottom text-left text-base', className)}
                {...props}
            />
        </div>
    );

    if (boxed) {
        return (
            <div className="overflow-hidden rounded-mistica-container border border-mistica-border bg-mistica-background-container">
                {table}
            </div>
        );
    }
    return table;
}

function TableHeader({className, ...props}: React.ComponentProps<'thead'>) {
    return (
        <thead
            data-slot="table-header"
            className={cn('border-b border-mistica-divider', className)}
            {...props}
        />
    );
}

function TableBody({className, ...props}: React.ComponentProps<'tbody'>) {
    return (
        <tbody
            data-slot="table-body"
            className={cn('[&_tr:last-child]:border-0', className)}
            {...props}
        />
    );
}

function TableRow({className, ...props}: React.ComponentProps<'tr'>) {
    return (
        <tr
            data-slot="table-row"
            className={cn(
                'border-b border-mistica-divider transition-colors hover:bg-mistica-background-container-hover',
                className
            )}
            {...props}
        />
    );
}

function TableHead({className, ...props}: React.ComponentProps<'th'>) {
    return (
        <th
            data-slot="table-head"
            className={cn('px-4 py-3 text-sm font-medium text-mistica-text-secondary', className)}
            {...props}
        />
    );
}

function TableCell({className, ...props}: React.ComponentProps<'td'>) {
    return (
        <td
            data-slot="table-cell"
            className={cn('px-4 py-(--mistica-table-cell-padding-y) text-mistica-text-primary', className)}
            {...props}
        />
    );
}

function TableCaption({className, ...props}: React.ComponentProps<'caption'>) {
    return (
        <caption
            data-slot="table-caption"
            className={cn('mt-2 px-4 pb-3 text-sm text-mistica-text-secondary', className)}
            {...props}
        />
    );
}

export {Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption};
