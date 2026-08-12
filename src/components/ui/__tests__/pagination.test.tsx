import {fireEvent, render, screen} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';

import {formatarTamanho} from '@/components/ui/file-upload';
import {Pagination, paginasVisiveis} from '@/components/ui/pagination';

describe('paginasVisiveis', () => {
    it('mostra todas quando cabem (ate 7)', () => {
        expect(paginasVisiveis(1, 5)).toEqual([1, 2, 3, 4, 5]);
        expect(paginasVisiveis(4, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
    });

    it('colapsa com reticencias no meio', () => {
        expect(paginasVisiveis(5, 12)).toEqual([1, 'ellipsis', 4, 5, 6, 'ellipsis', 12]);
    });

    it('nao poe reticencias para buraco de apenas 1 pagina', () => {
        expect(paginasVisiveis(3, 12)).toEqual([1, 2, 3, 4, 'ellipsis', 12]);
    });

    it('funciona nas bordas', () => {
        expect(paginasVisiveis(1, 12)).toEqual([1, 2, 'ellipsis', 12]);
        expect(paginasVisiveis(12, 12)).toEqual([1, 'ellipsis', 11, 12]);
    });
});

describe('Pagination', () => {
    it('marca a pagina atual e navega', () => {
        const onPageChange = vi.fn();
        render(<Pagination page={2} totalPages={5} onPageChange={onPageChange} />);

        expect(screen.getByLabelText('Página 2')).toHaveAttribute('aria-current', 'page');
        fireEvent.click(screen.getByLabelText('Página 4'));
        expect(onPageChange).toHaveBeenCalledWith(4);
        fireEvent.click(screen.getByLabelText('Próxima página'));
        expect(onPageChange).toHaveBeenCalledWith(3);
    });

    it('desabilita anterior na primeira pagina', () => {
        render(<Pagination page={1} totalPages={5} onPageChange={() => {}} />);
        expect(screen.getByLabelText('Página anterior')).toBeDisabled();
    });

    it('nao renderiza com 1 pagina', () => {
        const {container} = render(<Pagination page={1} totalPages={1} onPageChange={() => {}} />);
        expect(container).toBeEmptyDOMElement();
    });
});

describe('formatarTamanho', () => {
    it('formata B, KB e MB', () => {
        expect(formatarTamanho(512)).toBe('512 B');
        expect(formatarTamanho(245_000)).toBe('239 KB');
        expect(formatarTamanho(3_400_000)).toBe('3.2 MB');
    });
});
