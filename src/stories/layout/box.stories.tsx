import type {Meta, StoryObj} from '@storybook/react-vite';

import {Box, Placeholder} from '@/components/mistica';

/**
 * `Box`: contêiner com padding em px, como o Box do Mistica — sem opinião
 * de layout. Aceita `padding`, `paddingX`/`paddingY` e os quatro lados
 * individuais, além de `as` polimórfico. O fundo colorido nas stories é só
 * para visualizar a área de padding.
 */
const meta = {
    title: 'Layout/Box',
    component: Box,
    args: {
        padding: 16,
        className: 'rounded-mistica-media-small bg-mistica-brand-low',
        children: <Placeholder height={64} />,
    },
    argTypes: {
        padding: {control: 'number', description: 'Padding nos quatro lados (px)'},
        paddingX: {control: 'number', description: 'Padding horizontal (px), sobrepõe padding'},
        paddingY: {control: 'number', description: 'Padding vertical (px), sobrepõe padding'},
        paddingTop: {control: 'number'},
        paddingBottom: {control: 'number'},
        paddingLeft: {control: 'number'},
        paddingRight: {control: 'number'},
        children: {control: false},
        className: {control: false},
    },
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
    name: 'Padrão',
};

export const PaddingAssimetrico: Story = {
    name: 'Padding assimétrico',
    args: {paddingX: 40, paddingY: 12},
};

export const SemPadding: Story = {
    name: 'Sem padding',
    args: {padding: 0},
};
