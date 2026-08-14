import type {Meta, StoryObj} from '@storybook/react-vite';
import {fn} from 'storybook/test';

import {Counter} from '@/components/mistica';

/**
 * Counter do Mistica: seletor de quantidade [- n +] com `value`/`defaultValue`,
 * `onChangeValue`, limites `min`/`max` e `onRemove` (mostra a lixeira quando o
 * valor está no mínimo) — mesma API do `@telefonica/mistica`.
 */
const meta = {
    title: 'Componentes/Counter',
    component: Counter,
    args: {
        defaultValue: 1,
        onChangeValue: fn(),
        min: 0,
        max: 10,
        disabled: false,
    },
    argTypes: {
        defaultValue: {control: 'number', description: 'Quantidade inicial (não controlado)'},
        min: {control: 'number'},
        max: {control: 'number'},
        disabled: {control: 'boolean'},
        removeLabel: {control: 'text', description: 'Rótulo do botão de remover'},
    },
} satisfies Meta<typeof Counter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
    name: 'Padrão',
};

export const ComRemover: Story = {
    name: 'Com remover no mínimo',
    args: {defaultValue: 0, onRemove: fn()},
};

export const Desabilitado: Story = {
    args: {defaultValue: 3, disabled: true},
};
