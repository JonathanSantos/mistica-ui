import * as React from 'react';
import type {Meta, StoryObj} from '@storybook/react-vite';
import {fn} from 'storybook/test';

import {Rating} from '@/components/mistica';

/**
 * Rating do Mistica (community): estrelas selecionáveis, controladas por
 * `value`/`onValueChange`, com `max`, `size` e modo `readOnly`.
 */
const meta = {
    title: 'Componentes/Rating',
    component: Rating,
    args: {
        value: 3,
        onValueChange: fn(),
        max: 5,
        readOnly: false,
        size: 32,
    },
    argTypes: {
        value: {control: 'number', description: 'Estrelas preenchidas'},
        max: {control: 'number', description: 'Total de estrelas'},
        size: {control: 'number', description: 'Tamanho de cada estrela em px'},
        readOnly: {control: 'boolean', description: 'Somente exibição, sem interação'},
    },
} satisfies Meta<typeof Rating>;

export default meta;
type Story = StoryObj<typeof meta>;

const RatingInterativo = (args: React.ComponentProps<typeof Rating>) => {
    const [nota, setNota] = React.useState(args.value);
    return (
        <Rating
            {...args}
            value={nota}
            onValueChange={(valor) => {
                setNota(valor);
                args.onValueChange?.(valor);
            }}
        />
    );
};

export const Padrao: Story = {
    name: 'Padrão',
    render: (args) => <RatingInterativo {...args} />,
};

export const SomenteLeitura: Story = {
    name: 'Somente leitura',
    args: {value: 4, readOnly: true},
};

export const MaximoDez: Story = {
    name: 'Máximo de 10',
    args: {value: 7, max: 10, size: 24},
    render: (args) => <RatingInterativo {...args} />,
};

export const Pequeno: Story = {
    args: {value: 2, size: 20},
    render: (args) => <RatingInterativo {...args} />,
};
