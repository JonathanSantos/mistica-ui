import type {Meta, StoryObj} from '@storybook/react-vite';

import {Avatar} from '@/components/mistica';

/**
 * Avatar do Mistica: círculo com imagem (`src`) ou iniciais (`initials`,
 * fundo brandLow), tamanho em px via `size` e badge numérico opcional
 * no canto (`badge={0}` mostra só o ponto).
 */
const meta = {
    title: 'Componentes/Avatar',
    component: Avatar,
    args: {
        initials: 'JS',
        size: 40,
    },
    argTypes: {
        initials: {control: 'text', description: 'Iniciais mostradas quando não há imagem'},
        src: {control: 'text', description: 'URL da imagem'},
        alt: {control: 'text'},
        size: {control: 'number', description: 'Diâmetro em px'},
        badge: {control: 'number', description: 'Contador no canto (0 mostra só o ponto)'},
    },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ComIniciais: Story = {
    name: 'Com iniciais',
};

export const ComImagem: Story = {
    name: 'Com imagem',
    args: {
        src: 'https://picsum.photos/seed/vivo-cliente/200/200',
        alt: 'Foto do cliente',
        size: 48,
    },
};

export const ComBadge: Story = {
    name: 'Com badge',
    args: {initials: 'MR', badge: 3},
};

export const ComPonto: Story = {
    name: 'Com ponto de notificação',
    args: {initials: 'AC', badge: 0},
};

export const Grande: Story = {
    args: {initials: 'VF', size: 64},
};
