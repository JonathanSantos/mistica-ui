import * as React from 'react';
import {X} from 'lucide-react';

import {cn} from '@/lib/utils';
import {Text} from '@/components/ui/text';

/**
 * Callout Mistica: destaque inline com fundo backgroundAlternative,
 * radius de container, icone opcional, titulo/descricao, acoes e fechar.
 */
type CalloutProps = {
    title?: string;
    description: string;
    /** Como no Mistica: elemento pronto (icone/ilustracao) a esquerda. */
    asset?: React.ReactNode;
    /** Como no Mistica: ButtonPrimary/Secondary/Link prontos. */
    button?: React.ReactNode;
    secondaryButton?: React.ReactNode;
    buttonLink?: React.ReactNode;
    onClose?: () => void;
    'aria-label'?: string;
    className?: string;
};

function Callout({
    className,
    title,
    description,
    asset,
    button,
    secondaryButton,
    buttonLink,
    onClose,
    ...props
}: CalloutProps) {
    const acoes =
        button || secondaryButton || buttonLink ? (
            <>
                {button}
                {secondaryButton}
                {buttonLink}
            </>
        ) : null;
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
            {asset ? <div className="shrink-0">{asset}</div> : null}
            <div className="grid min-w-0 flex-1 gap-1">
                {title ? (
                    <Text as="h3" preset="text2" weight="medium">
                        {title}
                    </Text>
                ) : null}
                <Text preset="text2" color="secondary">
                    {description}
                </Text>
                {acoes ? <div className="mt-3 flex flex-wrap gap-3">{acoes}</div> : null}
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
