import {render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';

import {GridLayout} from '@/components/ui/grid-layout';

/** Spans (via CSS var) de cada filho direto do grid, na ordem do DOM. */
const spans = (grid: HTMLElement) =>
    Array.from(grid.children).map((child) =>
        (child as HTMLElement).style.getPropertyValue('--mistica-grid-col-span')
    );

describe('GridLayout', () => {
    it('template 6+6: duas colunas de 6, sem espacadores', () => {
        render(<GridLayout template="6+6" left="esquerda" right="direita" />);
        const grid = screen.getByTestId('GridLayout');
        expect(spans(grid)).toEqual(['6', '6']);
        expect(grid.children[0]).toHaveTextContent('esquerda');
        expect(grid.children[1]).toHaveTextContent('direita');
    });

    it('templates 8+4 e 3+9: spans oficiais, sem espacadores', () => {
        const {rerender} = render(<GridLayout template="8+4" left="esquerda" right="direita" />);
        expect(spans(screen.getByTestId('GridLayout'))).toEqual(['8', '4']);

        rerender(<GridLayout template="3+9" left="esquerda" right="direita" />);
        expect(spans(screen.getByTestId('GridLayout'))).toEqual(['3', '9']);
    });

    it('template 4+6: espacador de 1 depois de cada coluna', () => {
        render(<GridLayout template="4+6" left="esquerda" right="direita" />);
        const grid = screen.getByTestId('GridLayout');
        expect(spans(grid)).toEqual(['4', '1', '6', '1']);
        expect(grid.children[1]).toBeEmptyDOMElement();
        expect(grid.children[3]).toBeEmptyDOMElement();
    });

    it('template 5+4: espacadores de 1 nas bordas e entre as colunas', () => {
        render(<GridLayout template="5+4" left="esquerda" right="direita" />);
        expect(spans(screen.getByTestId('GridLayout'))).toEqual(['1', '5', '1', '4', '1']);
    });

    it('templates 10 e 8: conteudo central com espacadores nas bordas', () => {
        const {rerender} = render(<GridLayout template="10">conteudo</GridLayout>);
        expect(spans(screen.getByTestId('GridLayout'))).toEqual(['1', '10', '1']);

        rerender(<GridLayout template="8">conteudo</GridLayout>);
        expect(spans(screen.getByTestId('GridLayout'))).toEqual(['2', '8', '2']);
    });

    it('espacadores nao ocupam espaco colapsado (hidden ate o desktop)', () => {
        render(<GridLayout template="10">conteudo</GridLayout>);
        const grid = screen.getByTestId('GridLayout');
        expect(grid.children[0]).toHaveClass('hidden', 'lg:block');
        expect(grid.children[2]).toHaveClass('hidden', 'lg:block');
        expect(grid.children[1]).not.toHaveClass('hidden');
    });

    it('sem template: grid cru de 12 colunas com children direto', () => {
        render(
            <GridLayout>
                <div data-testid="celula-crua" />
            </GridLayout>
        );
        const grid = screen.getByTestId('GridLayout');
        expect(grid.children).toHaveLength(1);
        expect(grid.firstElementChild).toBe(screen.getByTestId('celula-crua'));
        expect(grid).toHaveClass('grid', 'lg:grid-cols-[repeat(12,1fr)]');
    });

    it('verticalSpace vira row-gap em px via CSS var (so no colapsado)', () => {
        render(<GridLayout verticalSpace={24}>conteudo</GridLayout>);
        const grid = screen.getByTestId('GridLayout');
        expect(grid.style.getPropertyValue('--mistica-grid-vertical-space')).toBe('24px');
        expect(grid).toHaveClass('gap-y-[var(--mistica-grid-vertical-space,0px)]', 'lg:gap-y-0');
    });

    it('sem verticalSpace nao define a CSS var (fallback 0px na classe)', () => {
        render(<GridLayout>conteudo</GridLayout>);
        const grid = screen.getByTestId('GridLayout');
        expect(grid.style.getPropertyValue('--mistica-grid-vertical-space')).toBe('');
    });

    it('collapseBreakpoint tablet (padrao): grid so no desktop (lg)', () => {
        render(<GridLayout template="6+6" left="a" right="b" />);
        const grid = screen.getByTestId('GridLayout');
        expect(grid).toHaveClass('lg:grid-cols-[repeat(12,1fr)]');
        expect(grid).not.toHaveClass('md:grid-cols-[repeat(12,1fr)]');
        expect(grid.children[0]).toHaveClass('lg:col-[span_var(--mistica-grid-col-span)]');
    });

    it('collapseBreakpoint mobile: ja e grid no tablet (md)', () => {
        render(<GridLayout template="6+6" left="a" right="b" collapseBreakpoint="mobile" />);
        const grid = screen.getByTestId('GridLayout');
        expect(grid).toHaveClass('md:grid-cols-[repeat(12,1fr)]');
        expect(grid.children[0]).toHaveClass('md:col-[span_var(--mistica-grid-col-span)]');
    });

    it('dataAttributes: prefixo data- e testid sobrescreve o padrao', () => {
        render(<GridLayout dataAttributes={{testid: 'MeuGrid', qsysid: 'checkout'}}>x</GridLayout>);
        const grid = screen.getByTestId('MeuGrid');
        expect(grid).toHaveAttribute('data-qsysid', 'checkout');
        expect(grid).toHaveAttribute('data-slot', 'grid-layout');
    });
});
