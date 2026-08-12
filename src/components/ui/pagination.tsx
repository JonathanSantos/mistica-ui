import {ChevronLeft, ChevronRight} from 'lucide-react';

import {cn} from '@/lib/utils';
import {IconButton} from '@/components/ui/icon-button';

/**
 * Pagination Mistica: numeros de pagina com reticencias, anterior/proximo
 * e pagina ativa em destaque (controlActivated).
 */

/** Paginas visiveis: primeira, ultima e vizinhas da atual, com reticencias. */
export function paginasVisiveis(atual: number, total: number): Array<number | 'ellipsis'> {
    if (total <= 7) {
        return Array.from({length: total}, (_, i) => i + 1);
    }
    const nucleo = new Set([1, total, atual - 1, atual, atual + 1]);
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
    /** Pagina atual (1-based). */
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    'aria-label'?: string;
    className?: string;
};

function Pagination({page, totalPages, onPageChange, 'aria-label': ariaLabel = 'Paginação', className}: PaginationProps) {
    if (totalPages <= 1) {
        return null;
    }

    return (
        <nav data-slot="pagination" aria-label={ariaLabel} className={className}>
            <ul className="flex items-center gap-1">
                <li>
                    <IconButton
                        Icon={ChevronLeft}
                        aria-label="Página anterior"
                        small
                        disabled={page <= 1}
                        onPress={() => onPageChange(page - 1)}
                    />
                </li>
                {paginasVisiveis(page, totalPages).map((item, index) =>
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
                                onClick={() => onPageChange(item)}
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
                )}
                <li>
                    <IconButton
                        Icon={ChevronRight}
                        aria-label="Próxima página"
                        small
                        disabled={page >= totalPages}
                        onPress={() => onPageChange(page + 1)}
                    />
                </li>
            </ul>
        </nav>
    );
}

export {Pagination};
