import type {Meta, StoryObj} from '@storybook/react-vite';
import {fn} from 'storybook/test';

import {DecimalField, IntegerField} from '@/components/mistica';

/**
 * Campos numéricos do Mistica: `DecimalField` aceita dígitos e uma vírgula
 * (pt-BR) ou ponto; `IntegerField` aceita somente dígitos. Mesma API do
 * `TextField` (`label`, `helperText`, `error`, `optional`, `onChangeValue`).
 */
const meta = {
    title: 'Componentes/Campos/Numéricos',
    component: DecimalField,
    args: {
        label: 'Valor (R$)',
        onChangeValue: fn(),
        error: false,
        optional: false,
        disabled: false,
    },
    argTypes: {
        label: {control: 'text', description: 'Rótulo flutuante do campo'},
        helperText: {control: 'text', description: 'Texto auxiliar abaixo do campo'},
        error: {control: 'boolean', description: 'Estado de erro'},
        optional: {control: 'boolean', description: 'Marca "(opcional)" no label'},
        disabled: {control: 'boolean'},
    },
} satisfies Meta<typeof DecimalField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Decimal: Story = {
    name: 'DecimalField',
    args: {
        helperText: 'Use vírgula para os centavos',
    },
};

export const Inteiro: Story = {
    name: 'IntegerField',
    args: {
        label: 'Quantidade de linhas',
        helperText: 'Somente dígitos',
    },
    render: (args) => <IntegerField {...args} />,
};

export const ComErro: Story = {
    name: 'Com erro',
    args: {
        error: true,
        helperText: 'Informe um valor maior que zero',
        defaultValue: '0',
    },
};

export const Desabilitado: Story = {
    args: {
        disabled: true,
        defaultValue: '54,99',
    },
};
