import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {HorizontalScroll, Placeholder} from '@/components/mistica';

/**
 * `HorizontalScroll`: linha com rolagem horizontal e scrollbar oculta —
 * usada para trilhas de cards (planos, apps, benefícios). `snap` alinha os
 * itens ao rolar.
 */
const meta = {
    title: 'Layout/HorizontalScroll',
    component: HorizontalScroll,
    args: {
        space: 16,
        snap: false,
        children: (
            <>
                {Array.from({length: 8}, (_, i) => (
                    <Placeholder key={i} height={120} width={220} />
                ))}
            </>
        ),
    },
    argTypes: {
        space: {control: 'number', description: 'Espaço entre itens (px)'},
        snap: {control: 'boolean', description: 'Alinha itens por snap ao rolar'},
        children: {control: false},
    },
} satisfies Meta<typeof HorizontalScroll>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
    name: 'Padrão',
};

export const ComSnap: Story = {
    name: 'Com snap',
    args: {snap: true},
};

export const EspacoMenor: Story = {
    name: 'Espaço de 8px',
    args: {space: 8},
};
