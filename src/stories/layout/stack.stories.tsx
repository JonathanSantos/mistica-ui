import type {Meta, StoryObj} from '@storybook/react-vite';

import {Placeholder, Stack} from '@/components/mistica';

/**
 * `Stack`: pilha vertical com espaço entre filhos (`space` em px) e
 * alinhamento horizontal opcional (`align`) — mesma API do Mistica.
 */
const meta = {
    title: 'Layout/Stack',
    component: Stack,
    args: {
        space: 16,
        align: 'stretch',
        children: (
            <>
                <Placeholder height={48} />
                <Placeholder height={48} />
                <Placeholder height={48} />
            </>
        ),
    },
    argTypes: {
        space: {control: 'number', description: 'Espaço entre filhos (px)'},
        align: {
            control: 'select',
            options: ['start', 'center', 'end', 'stretch'],
            description: 'Alinhamento horizontal dos filhos',
        },
        children: {control: false},
    },
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
    name: 'Padrão',
};

export const EspacoGrande: Story = {
    name: 'Espaço de 32px',
    args: {space: 32},
};

export const Centralizado: Story = {
    name: 'Alinhado ao centro',
    args: {
        align: 'center',
        children: (
            <>
                <Placeholder height={48} width={280} />
                <Placeholder height={48} width={200} />
                <Placeholder height={48} width={240} />
            </>
        ),
    },
};
