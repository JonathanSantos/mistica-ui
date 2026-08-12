import * as React from 'react';
import {X} from 'lucide-react';

import {cn} from '@/lib/utils';
import {Text} from '@/components/ui/text';

/**
 * Callout Mistica: destaque inline com fundo backgroundAlternative,
 * radius de container, icone opcional, titulo/descricao, acoes e fechar.
 */
type CalloutProps = React.ComponentProps<'div'> & {
    title?: string;
    description: string;
    Icon?: React.ComponentType<{className?: string}>;
    /** Botoes/acoes renderizados abaixo da descricao. */
    actions?: React.ReactNode;
    onClose?: () => void;
};

function Callout({className, title, description, Icon, actions, onClose, ...props}: CalloutProps) {
    return (
        <div
            data-slot="callout"
            role="status"
            className={cn(
                'flex gap-4 rounded-mistica-container bg-mistica-background-alternative p-4 lg:p-6',
                className
            )}
            {...props}
        >
            {Icon ? <Icon className="mt-0.5 size-6 shrink-0 text-mistica-neutral-high" aria-hidden /> : null}
            <div className="grid min-w-0 flex-1 gap-1">
                {title ? (
                    <Text as="h3" preset="text2" weight="medium">
                        {title}
                    </Text>
                ) : null}
                <Text preset="text2" color="secondary">
                    {description}
                </Text>
                {actions ? <div className="mt-3 flex flex-wrap gap-3">{actions}</div> : null}
            </div>
            {onClose ? (
                <button
                    type="button"
                    aria-label="Fechar"
                    onClick={onClose}
                    className="-mt-1 -mr-1 h-fit cursor-pointer rounded-full p-1.5 text-mistica-neutral-high outline-none hover:bg-mistica-background-container-hover focus-visible:ring-2 focus-visible:ring-mistica-control-activated"
                >
                    <X className="size-4" />
                </button>
            ) : null}
        </div>
    );
}

export {Callout};
