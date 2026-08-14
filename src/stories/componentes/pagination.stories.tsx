import type {Meta, StoryObj} from '@storybook/react-vite';
import * as React from 'react';
import {fn} from 'storybook/test';

import {Pagination, Text} from '@/components/mistica';

/**
 * Pagination do Mistica: números de página com reticências, anterior/próximo
 * e página ativa em destaque (controlActivated).
 * API: `{page (1-based), totalPages, onPageChange}`.
 */
const meta = {
    title: 'Componentes/Pagination',
    component: Pagination,
    args: {
        page: 5,
        totalPages: 12,
        onPageChange: fn(),
    },
    argTypes: {
        page: {control: {type: 'number', min: 1}, description: 'Página atual (1-based)'},
        totalPages: {control: {type: 'number', min: 1}},
    },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
    name: 'Padrão',
};

export const PoucasPaginas: Story = {
    name: 'Poucas páginas',
    args: {page: 2, totalPages: 5},
};

export const MuitasPaginas: Story = {
    name: 'Muitas páginas',
    args: {page: 20, totalPages: 40},
};

export const Interativo: Story = {
    render: (args) => {
        const [pagina, setPagina] = React.useState(1);
        return (
            <div className="grid gap-3">
                <Text preset="text1" color="secondary">
                    Histórico de faturas — página {pagina} de {args.totalPages}
                </Text>
                <Pagination
                    page={pagina}
                    totalPages={args.totalPages}
                    onPageChange={(proxima) => {
                        setPagina(proxima);
                        args.onPageChange(proxima);
                    }}
                />
            </div>
        );
    },
};
