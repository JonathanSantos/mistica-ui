import * as React from 'react';

import {cn} from '@/lib/utils';

/**
 * Badge Mistica: indicador numerico (ou ponto) com o token badge.
 * Sem children: renderiza standalone. Com children: posiciona o
 * indicador no canto superior direito do conteudo (ex: um icone).
 */
type BadgeProps = React.ComponentProps<'div'> & {
    /** Quantidade exibida. Acima de 9 vira "+9". Omitido: mostra so o ponto. */
    value?: number;
};

function BadgeIndicator({value, className}: {value?: number; className?: string}) {
    if (value === undefined) {
        return (
            <span
                data-slot="badge-indicator"
                className={cn('block size-2 rounded-full bg-mistica-badge', className)}
            />
        );
    }

    return (
        <span
            data-slot="badge-indicator"
            className={cn(
                'flex h-5 min-w-5 items-center justify-center rounded-full bg-mistica-badge px-1.5 text-xs font-medium leading-none text-white',
                className
            )}
        >
            {value > 9 ? '+9' : value}
        </span>
    );
}

function Badge({value, children, className, ...props}: BadgeProps) {
    if (!children) {
        return (
            <div data-slot="badge" className={cn('inline-flex', className)} {...props}>
                <BadgeIndicator value={value} />
            </div>
        );
    }

    return (
        <div data-slot="badge" className={cn('relative inline-flex', className)} {...props}>
            {children}
            <BadgeIndicator
                value={value}
                className="absolute -top-1 -right-1 translate-x-1/4 -translate-y-1/4"
            />
        </div>
    );
}

export {Badge};
