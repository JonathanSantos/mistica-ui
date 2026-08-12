import * as React from 'react';

import {cn} from '@/lib/utils';

/**
 * ButtonFixedFooterLayout Mistica: conteudo com rodape de botoes preso
 * embaixo (sticky), com fundo de container e borda superior — padrao de
 * fluxos mobile do Mistica.
 */
type ButtonFixedFooterLayoutProps = {
    children: React.ReactNode;
    /** Botao principal (ReactNode para manter a composicao shadcn). */
    button: React.ReactNode;
    secondaryButton?: React.ReactNode;
    className?: string;
};

function ButtonFixedFooterLayout({children, button, secondaryButton, className}: ButtonFixedFooterLayoutProps) {
    return (
        <div data-slot="button-fixed-footer-layout" className={cn('flex min-h-full flex-col', className)}>
            <div className="flex-1">{children}</div>
            <div className="sticky bottom-0 border-t border-mistica-divider bg-mistica-background-container p-4">
                <div className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row-reverse sm:justify-start">
                    {button}
                    {secondaryButton}
                </div>
            </div>
        </div>
    );
}

export {ButtonFixedFooterLayout};
