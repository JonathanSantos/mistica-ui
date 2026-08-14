import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {Text, Title1, Title2, Title3, Title4} from '@/components/mistica';

/**
 * Titles do Mistica: `Title1`..`Title4`, componentes de título com os
 * presets do skin. `Title1` é uppercase (heading de seção, como no skin
 * vivo); os demais crescem em tamanho até `Title4`. Peso por prop
 * booleana (`<Title3 bold>`) e cor via tokens de texto.
 */
const meta = {
    title: 'Componentes/Titles',
    component: Title1,
    args: {
        children: 'Minha conta Vivo',
    },
    argTypes: {
        children: {control: 'text', description: 'Conteúdo do título'},
        bold: {control: 'boolean', description: 'Peso bold'},
        medium: {control: 'boolean', description: 'Peso medium'},
        regular: {control: 'boolean', description: 'Peso regular'},
        light: {control: 'boolean', description: 'Peso light'},
        color: {
            control: 'select',
            options: ['primary', 'secondary', 'link', 'error', 'activated', 'brand', 'inverse'],
            description: 'Cor via token de texto',
        },
    },
} satisfies Meta<typeof Title1>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Titulo1: Story = {
    name: 'Title1',
};

export const Titulo2: Story = {
    name: 'Title2',
    render: (args) => <Title2 {...args} />,
};

export const Titulo3: Story = {
    name: 'Title3',
    render: (args) => <Title3 {...args} />,
};

export const Titulo4: Story = {
    name: 'Title4',
    render: (args) => <Title4 {...args} />,
};

export const Hierarquia: Story = {
    render: () => (
        <div className="grid gap-3">
            <Title4>Title4 — Planos e ofertas</Title4>
            <Title3>Title3 — Vivo Fibra 500 Mega</Title3>
            <Title2>Title2 — Detalhes da assinatura</Title2>
            <Title1 color="secondary">Title1 — Seção de fatura</Title1>
            <Text preset="text1" color="secondary">
                Title1 é uppercase por padrão, no estilo dos headings de seção do Mistica.
            </Text>
        </div>
    ),
};
