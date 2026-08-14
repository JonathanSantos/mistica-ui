import type {Meta, StoryObj} from '@storybook/react-vite';
import {fn} from 'storybook/test';
import {Bell, Gift, ShoppingCart, Trash2} from 'lucide-react';

import {IconButton} from '@/components/mistica';

/**
 * IconButton do Mistica: botão circular só de ícone, com `Icon`, `aria-label`
 * obrigatório, `onPress`, cor do ícone (`type`) e fundo (`backgroundType`)
 * — mesma API do `@telefonica/mistica`.
 */
const meta = {
    title: 'Componentes/Botões/IconButton',
    component: IconButton,
    args: {
        Icon: Bell,
        'aria-label': 'Notificações',
        onPress: fn(),
        type: 'neutral',
        backgroundType: 'transparent',
        small: false,
        disabled: false,
    },
    argTypes: {
        type: {
            control: 'select',
            options: ['neutral', 'brand', 'danger'],
            description: 'Cor do ícone',
        },
        backgroundType: {
            control: 'select',
            options: ['transparent', 'soft', 'solid'],
            description: 'Fundo do botão',
        },
        small: {control: 'boolean', description: 'Tamanho reduzido'},
        disabled: {control: 'boolean'},
    },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
    name: 'Padrão',
};

export const FundoSuave: Story = {
    name: 'Fundo suave',
    args: {Icon: Gift, 'aria-label': 'Resgatar presente', backgroundType: 'soft'},
};

export const FundoSolido: Story = {
    name: 'Fundo sólido',
    args: {Icon: ShoppingCart, 'aria-label': 'Abrir carrinho', backgroundType: 'solid'},
};

export const Perigo: Story = {
    name: 'Ícone de perigo',
    args: {Icon: Trash2, 'aria-label': 'Excluir linha', type: 'danger'},
};

export const Pequeno: Story = {
    args: {small: true},
};
