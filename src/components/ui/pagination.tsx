import * as React from 'react';
import {ChevronLeft, ChevronRight} from 'lucide-react';

import {cn} from '@/lib/utils';
import {IconButton} from '@/components/ui/icon-button';

/**
 * Pagination Mistica: numeros de pagina com reticencias, anterior/proximo
 * e pagina ativa em destaque (controlActivated).
 *
 * API identica ao @telefonica/mistica: currentPage/defaultPage, onChange,
 * surroundingPageCount, hideNavigationControls/hidePageList e mode iconOnly.
 */

/** Paginas visiveis: primeira, ultima e vizinhas da atual, com reticencias. */
export function paginasVisiveis(
    atual: number,
    total: number,
    vizinhos = 1
): Array<number | 'ellipsis'> {
    if (total <= 5 + 2 * vizinhos) {
        return Array.from({length: total}, (_, i) => i + 1);
    }
    const nucleo = new Set([1, total]);
    for (let d = -vizinhos; d <= vizinhos; d++) {
        nucleo.add(atual + d);
    }
    const paginas = [...nucleo].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
    const resultado: Array<number | 'ellipsis'> = [];
    for (let i = 0; i < paginas.length; i++) {
        if (i > 0) {
            const buraco = paginas[i] - paginas[i - 1];
            if (buraco === 2) {
                resultado.push(paginas[i] - 1); // buraco de 1: mostra o numero direto
            } else if (buraco > 2) {
                resultado.push('ellipsis');
            }
        }
        resultado.push(paginas[i]);
    }
    return resultado;
}

type PaginationProps = {
    totalPages: number;
    /** Pagina atual (1-based, controlado). */
    currentPage?: number;
    /** Pagina inicial (nao controlado). */
    defaultPage?: number;
    onChange?: (page: number) => void;
    hideNavigationControls?: boolean;
    hidePageList?: boolean;
    /** Vizinhas visiveis de cada lado da pagina atual. */
    surroundingPageCount?: number;
    navLeftLabel?: string;
    navRightLabel?: string;
    mode?: 'default' | 'iconOnly';
    disabled?: boolean;
    'aria-label'?: string;
    className?: string;
};

function Pagination({
    totalPages,
    currentPage,
    defaultPage = 1,
    onChange,
    hideNavigationControls,
    hidePageList,
    surroundingPageCount = 1,
    navLeftLabel = 'Página anterior',
    navRightLabel = 'Próxima página',
    mode = 'default',
    disabled,
    'aria-label': ariaLabel = 'Paginação',
    className,
}: PaginationProps) {
    const [interna, setInterna] = React.useState(defaultPage);
    const page = currentPage ?? interna;

    if (totalPages <= 1) {
        return null;
    }

    const irPara = (proxima: number) => {
        setInterna(proxima);
        onChange?.(proxima);
    };
    const semLista = hidePageList || mode === 'iconOnly';

    return (
        <nav
            data-slot="pagination"
            aria-label={ariaLabel}
            className={cn(disabled && 'pointer-events-none opacity-50', className)}
        >
            <ul className="flex items-center gap-1">
                {!hideNavigationControls ? (
                    <li>
                        <IconButton
                            Icon={ChevronLeft}
                            aria-label={navLeftLabel}
                            small
                            disabled={disabled || page <= 1}
                            onPress={() => irPara(page - 1)}
                        />
                    </li>
                ) : null}
                {semLista ? (
                    <li aria-live="polite" className="px-2 text-sm text-mistica-text-secondary">
                        {page} / {totalPages}
                    </li>
                ) : (
                    paginasVisiveis(page, totalPages, surroundingPageCount).map((item, index) =>
                        item === 'ellipsis' ? (
                            <li key={`e-${index}`} aria-hidden className="px-1 text-mistica-text-secondary">
                                …
                            </li>
                        ) : (
                            <li key={item}>
                                <button
                                    type="button"
                                    aria-label={`Página ${item}`}
                                    aria-current={item === page ? 'page' : undefined}
                                    disabled={disabled}
                                    onClick={() => irPara(item)}
                                    className={cn(
                                        'flex size-8 cursor-pointer items-center justify-center rounded-full text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-mistica-control-activated',
                                        item === page
                                            ? 'bg-mistica-control-activated text-mistica-inverse'
                                            : 'text-mistica-text-primary hover:bg-mistica-background-container-hover'
                                    )}
                                >
                                    {item}
                                </button>
                            </li>
                        )
                    )
                )}
                {!hideNavigationControls ? (
                    <li>
                        <IconButton
                            Icon={ChevronRight}
                            aria-label={navRightLabel}
                            small
                            disabled={disabled || page >= totalPages}
                            onPress={() => irPara(page + 1)}
                        />
                    </li>
                ) : null}
            </ul>
        </nav>
    );
}

export {Pagination};
