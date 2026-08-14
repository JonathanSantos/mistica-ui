import type {Meta, StoryObj} from '@storybook/react-vite';
import {fn} from 'storybook/test';

import {Breadcrumbs} from '@/components/mistica';

/**
 * Breadcrumbs do Mistica: trilha de navegação com separador "/",
 * itens anteriores como link e o item atual em textSecondary.
 */
const meta = {
    title: 'Componentes/Breadcrumbs',
    component: Breadcrumbs,
    args: {
        items: [
            {title: 'Início', href: '#'},
            {title: 'Produtos', href: '#'},
            {title: 'Vivo Fibra'},
        ],
        label: 'Você está em',
    },
    argTypes: {
        label: {control: 'text', description: 'Rótulo de acessibilidade da nav'},
        items: {description: 'Itens: {title, href?, onPress?}'},
    },
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
    name: 'Padrão',
};

export const DoisNiveis: Story = {
    name: 'Dois níveis',
    args: {
        items: [{title: 'Minha Vivo', href: '#'}, {title: 'Faturas'}],
    },
};

export const ComOnPress: Story = {
    name: 'Com onPress',
    args: {
        items: [
            {title: 'Início', onPress: fn()},
            {title: 'Planos', onPress: fn()},
            {title: 'Vivo Total'},
        ],
    },
};

export const TrilhaLonga: Story = {
    name: 'Trilha longa',
    args: {
        items: [
            {title: 'Início', href: '#'},
            {title: 'Produtos', href: '#'},
            {title: 'Internet', href: '#'},
            {title: 'Vivo Fibra', href: '#'},
            {title: 'Fibra 500 Mega'},
        ],
    },
};
