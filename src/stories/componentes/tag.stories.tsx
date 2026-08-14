import type {Meta, StoryObj} from '@storybook/react-vite';
import {Star} from 'lucide-react';

import {Tag} from '@/components/mistica';

/**
 * Tag do Mistica: etiqueta com os tipos semânticos do design system
 * (`promo`, `active`, `inactive`, `success`, `warning`, `error`, `info`)
 * e ícone opcional via `Icon`.
 */
const meta = {
    title: 'Componentes/Tag',
    component: Tag,
    args: {
        children: 'Promoção',
        type: 'promo',
    },
    argTypes: {
        children: {control: 'text', description: 'Texto da tag'},
        type: {
            control: 'select',
            options: ['promo', 'active', 'inactive', 'success', 'warning', 'error', 'info'],
            description: 'Tipo semântico',
        },
    },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
    name: 'Padrão',
};

export const ComIcone: Story = {
    name: 'Com ícone',
    args: {Icon: Star, children: 'Oferta especial'},
};

export const Sucesso: Story = {
    args: {type: 'success', children: 'Fatura paga'},
};

export const TodosOsTipos: Story = {
    name: 'Todos os tipos',
    render: () => (
        <div className="flex flex-wrap gap-2">
            <Tag type="promo">Promoção</Tag>
            <Tag type="active">Ativo</Tag>
            <Tag type="inactive">Inativo</Tag>
            <Tag type="success">Pago</Tag>
            <Tag type="warning">Pendente</Tag>
            <Tag type="error">Vencida</Tag>
            <Tag type="info">Vivo Play</Tag>
        </div>
    ),
};
