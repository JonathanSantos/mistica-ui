import * as React from 'react';

import {cn} from '@/lib/utils';

/**
 * ScreenReaderOnly / SkipLink Mistica: utilitarios de acessibilidade
 * sem o consumidor precisar conhecer classes utilitarias.
 */
function ScreenReaderOnly({children, as: Comp = 'span'}: {children: React.ReactNode; as?: React.ElementType}) {
    return (
        <Comp data-slot="screen-reader-only" className="sr-only">
            {children}
        </Comp>
    );
}

type SkipLinkProps = {
    /** id do elemento de destino (sem #). */
    targetId: string;
    children?: React.ReactNode;
    className?: string;
};

/** Link "pular para o conteudo": invisivel ate receber foco por teclado. */
function SkipLink({targetId, children = 'Pular para o conteúdo', className}: SkipLinkProps) {
    return (
        <a
            data-slot="skip-link"
            href={`#${targetId}`}
            className={cn(
                'sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-mistica-button focus:bg-mistica-button-primary-background focus:px-4 focus:py-3 focus:font-medium focus:text-mistica-text-button-primary focus:outline-none',
                className
            )}
        >
            {children}
        </a>
    );
}

export {ScreenReaderOnly, SkipLink};
