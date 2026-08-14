import type {Meta, StoryObj} from '@storybook/react-vite';

import {Inline, Placeholder} from '@/components/mistica';

/**
 * `Inline`: linha horizontal com espaço entre filhos. Como no Mistica,
 * `space` aceita número (px) ou `'between' | 'around' | 'evenly'` para
 * distribuir os itens, e `fullWidth` estica os filhos igualmente.
 */
const meta = {
    title: 'Layout/Inline',
    component: Inline,
    args: {
        space: 8,
        alignItems: 'center',
        fullWidth: false,
        wrap: true,
        children: (
            <>
                <Placeholder height={48} width={96} />
                <Placeholder height={48} width={96} />
                <Placeholder height={48} width={96} />
                <Placeholder height={48} width={96} />
            </>
        ),
    },
    argTypes: {
        space: {
            control: 'select',
            options: [4, 8, 16, 24, 32, 'between', 'around', 'evenly'],
            description: 'Espaço em px ou distribuição dos itens na largura toda',
        },
        alignItems: {
            control: 'select',
            options: ['start', 'center', 'end', 'stretch'],
            description: 'Alinhamento vertical dos filhos',
        },
        fullWidth: {control: 'boolean', description: 'Estica os filhos igualmente'},
        wrap: {control: 'boolean', description: 'Permite quebra de linha'},
        children: {control: false},
    },
} satisfies Meta<typeof Inline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
    name: 'Padrão',
};

export const Distribuido: Story = {
    name: "space='between'",
    args: {space: 'between'},
};

export const LarguraTotal: Story = {
    name: 'fullWidth',
    args: {fullWidth: true},
};

export const AlinhadoNaBase: Story = {
    name: 'Alinhado na base',
    args: {
        alignItems: 'end',
        children: (
            <>
                <Placeholder height={32} width={96} />
                <Placeholder height={64} width={96} />
                <Placeholder height={48} width={96} />
            </>
        ),
    },
};
