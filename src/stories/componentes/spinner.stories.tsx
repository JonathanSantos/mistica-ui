import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {Spinner, Text} from '@/components/mistica';

/**
 * `Spinner` do Mistica: indicador circular de carregamento na cor
 * controlActivated. O traço usa `currentColor`, então a cor pode ser
 * trocada via classe de texto.
 */
const meta = {
    title: 'Componentes/Spinner',
    component: Spinner,
    args: {
        size: 24,
    },
    argTypes: {
        size: {control: {type: 'number', min: 12, max: 96}, description: 'Lado do spinner em px (padrão 24)'},
    },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {};

export const Tamanhos: Story = {
    render: () => (
        <div className="flex items-center gap-6">
            <Spinner size={16} />
            <Spinner size={24} />
            <Spinner size={32} />
            <Spinner size={48} />
        </div>
    ),
};

export const CorPersonalizada: Story = {
    name: 'Cor personalizada',
    render: (args) => (
        <div className="flex items-center gap-3">
            <Spinner {...args} className="text-mistica-text-error" />
            <Text preset="text2" color="secondary">
                Herda a cor via currentColor
            </Text>
        </div>
    ),
};
