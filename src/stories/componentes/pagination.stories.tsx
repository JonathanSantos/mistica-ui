import type {Meta, StoryObj} from '@storybook/react-webpack5';
import {fn} from 'storybook/test';

import {Pagination} from '@/components/mistica';

/**
 * Pagination do Mistica: números de página com reticências, anterior/próximo
 * e página ativa em destaque. API do `@telefonica/mistica`: `totalPages`,
 * `currentPage`/`defaultPage`, `onChange`, `surroundingPageCount`,
 * `hideNavigationControls`/`hidePageList` e `mode="iconOnly"`.
 */
const meta = {
    title: 'Componentes/Pagination',
    component: Pagination,
    args: {
        defaultPage: 5,
        totalPages: 12,
        onChange: fn(),
        disabled: false,
    },
    argTypes: {
        defaultPage: {
            control: {type: 'number', min: 1},
            description: 'Página inicial (não controlado)',
        },
        totalPages: {control: {type: 'number', min: 1}},
        surroundingPageCount: {control: 'number', description: 'Vizinhas de cada lado da atual'},
        mode: {control: 'select', options: ['default', 'iconOnly']},
        disabled: {control: 'boolean'},
    },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
    name: 'Padrão',
};

export const PoucasPaginas: Story = {
    name: 'Poucas páginas',
    args: {defaultPage: 2, totalPages: 5},
};

export const MuitasPaginas: Story = {
    name: 'Muitas páginas',
    args: {defaultPage: 20, totalPages: 40, surroundingPageCount: 2},
};

export const SomenteIcones: Story = {
    name: 'Modo iconOnly',
    args: {mode: 'iconOnly'},
};

export const SemSetas: Story = {
    name: 'Sem controles de navegação',
    args: {hideNavigationControls: true},
};
