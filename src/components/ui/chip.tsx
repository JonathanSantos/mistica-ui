import * as React from 'react';
import {X} from 'lucide-react';

import {cn} from '@/lib/utils';

/**
 * Chip Mistica: pilula selecionavel (radius de chip do skin, 24px).
 * Ativo: fundo brandLow + texto/borda controlActivated, como no mistica-web.
 */
type ChipProps = React.ComponentProps<'button'> & {
    active?: boolean;
    Icon?: React.ComponentType<{className?: string}>;
    /** Quando presente, mostra o X de fechar e chama ao clicar. */
    onClose?: () => void;
};

function Chip({className, active = false, Icon, onClose, children, ...props}: ChipProps) {
    return (
        <button
            type="button"
            data-slot="chip"
            aria-pressed={onClose ? undefined : active}
            className={cn(
                'inline-flex h-(--mistica-height-chip) shrink-0 cursor-pointer items-center gap-2 rounded-mistica-chip border px-3 text-sm font-medium transition-colors duration-100 outline-none focus-visible:ring-2 focus-visible:ring-mistica-control-activated focus-visible:ring-offset-2 focus-visible:ring-offset-mistica-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0',
                active
                    ? 'border-mistica-control-activated bg-mistica-brand-low text-mistica-text-activated'
                    : 'border-mistica-border bg-mistica-background-container text-mistica-text-primary hover:border-mistica-control-activated hover:text-mistica-text-activated',
                className
            )}
            {...props}
        >
            {Icon ? <Icon aria-hidden /> : null}
            {children}
            {onClose ? (
                <X
                    role="button"
                    aria-label="Fechar"
                    className="-mr-1 cursor-pointer text-mistica-neutral-medium hover:text-mistica-text-primary"
                    onClick={(event) => {
                        event.stopPropagation();
                        onClose();
                    }}
                />
            ) : null}
        </button>
    );
}

export {Chip};
