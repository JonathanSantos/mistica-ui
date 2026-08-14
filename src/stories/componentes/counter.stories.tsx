import * as React from 'react';
import type {Meta, StoryObj} from '@storybook/react-vite';
import {fn} from 'storybook/test';

import {Counter} from '@/components/mistica';

/**
 * Counter do Mistica: seletor de quantidade [- n +] controlado por
 * `value`/`onValueChange`, com limites `min`/`max` e `onRemove`
 * (mostra a lixeira quando o valor está no mínimo).
 */
const meta = {
    title: 'Componentes/Counter',
    component: Counter,
    args: {
        value: 1,
        onValueChange: fn(),
        min: 0,
        max: 10,
        disabled: false,
    },
    argTypes: {
        value: {control: 'number', description: 'Quantidade atual (controlada)'},
        min: {control: 'number'},
        max: {control: 'number'},
        disabled: {control: 'boolean'},
    },
} satisfies Meta<typeof Counter>;

export default meta;
type Story = StoryObj<typeof meta>;

const CounterInterativo = (args: React.ComponentProps<typeof Counter>) => {
    const [quantidade, setQuantidade] = React.useState(args.value);
    return (
        <Counter
            {...args}
            value={quantidade}
            onValueChange={(valor) => {
                setQuantidade(valor);
                args.onValueChange(valor);
            }}
        />
    );
};

export const Padrao: Story = {
    name: 'Padrão',
    render: (args) => <CounterInterativo {...args} />,
};

export const ComRemover: Story = {
    name: 'Com remover no mínimo',
    args: {value: 0, onRemove: fn()},
    render: (args) => <CounterInterativo {...args} />,
};

export const Desabilitado: Story = {
    args: {value: 3, disabled: true},
};
