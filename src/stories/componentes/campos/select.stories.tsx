import type {Meta, StoryObj} from '@storybook/react-webpack5';
import {fn} from 'storybook/test';

import {Select} from '@/components/mistica';

const planos = [
    {value: 'vivo-easy', text: 'Vivo Easy'},
    {value: 'vivo-controle', text: 'Vivo Controle'},
    {value: 'vivo-pos', text: 'Vivo Pós'},
    {value: 'vivo-fibra', text: 'Vivo Fibra'},
];

/**
 * Select do Mistica: campo de seleção dirigido por `options`
 * (`{value, text}`), com a mesma assinatura do `@telefonica/mistica`
 * (`label`, `name`, `onChangeValue`, `helperText`, `error`, `optional`).
 */
const meta = {
    title: 'Componentes/Campos/Select',
    component: Select,
    args: {
        label: 'Plano',
        name: 'plano',
        options: planos,
        onChangeValue: fn(),
        error: false,
        optional: false,
        disabled: false,
    },
    argTypes: {
        label: {control: 'text', description: 'Rótulo flutuante do campo'},
        helperText: {control: 'text', description: 'Texto de apoio abaixo do campo'},
        error: {control: 'boolean', description: 'Estado de erro'},
        optional: {control: 'boolean', description: 'Acrescenta "(opcional)" ao label'},
        disabled: {control: 'boolean'},
        options: {control: false, description: 'Opções no formato {value, text}'},
    },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
    name: 'Padrão',
    args: {helperText: 'Você pode trocar de plano quando quiser'},
};

export const ComValorInicial: Story = {
    name: 'Com valor inicial',
    args: {defaultValue: 'vivo-controle'},
};

export const ComErro: Story = {
    name: 'Com erro',
    args: {
        error: true,
        helperText: 'Selecione um plano para continuar',
    },
};

export const Opcional: Story = {
    args: {label: 'Serviço adicional', optional: true},
};

export const Desabilitado: Story = {
    args: {defaultValue: 'vivo-fibra', disabled: true},
};
