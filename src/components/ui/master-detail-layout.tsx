import * as React from 'react';
import {ArrowLeft} from 'lucide-react';

import {cn} from '@/lib/utils';
import {IconButton} from '@/components/ui/icon-button';

/**
 * MasterDetailLayout Mistica: lista (master) a esquerda e detalhe a direita
 * no desktop; no mobile mostra um por vez (isDetailOpen + onGoBack).
 * O layout tipico de telas internas densas.
 */
type MasterDetailLayoutProps = {
    /** Conteudo da coluna master (lista/menu). */
    master: React.ReactNode;
    /** Conteudo do detalhe. */
    children: React.ReactNode;
    /** No mobile: true mostra o detalhe no lugar do master. */
    isDetailOpen?: boolean;
    /** Chamado pelo botao de voltar do mobile. */
    onGoBack?: () => void;
    /** Largura da coluna master no desktop (px). */
    masterWidth?: number;
    className?: string;
};

function MasterDetailLayout({
    master,
    children,
    isDetailOpen = false,
    onGoBack,
    masterWidth = 320,
    className,
}: MasterDetailLayoutProps) {
    return (
        <div
            data-slot="master-detail-layout"
            className={cn('lg:grid', className)}
            style={{gridTemplateColumns: `${masterWidth}px minmax(0, 1fr)`}}
        >
            <div
                className={cn(
                    'lg:block lg:border-r lg:border-mistica-divider',
                    isDetailOpen && 'hidden'
                )}
            >
                {master}
            </div>
            <div className={cn('lg:block', !isDetailOpen && 'hidden')}>
                {onGoBack ? (
                    <div className="p-2 lg:hidden">
                        <IconButton aria-label="Voltar para a lista" size="small" onClick={onGoBack}>
                            <ArrowLeft />
                        </IconButton>
                    </div>
                ) : null}
                {children}
            </div>
        </div>
    );
}

export {MasterDetailLayout};
