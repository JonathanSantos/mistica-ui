import type {Meta, StoryObj} from '@storybook/react-webpack5';
import {fn} from 'storybook/test';

import {EmailField, TextField} from '@/components/mistica';

/**
 * Campo de texto do Mistica com label flutuante — mesma API do
 * `@telefonica/mistica` (`label`, `name`, `onChangeValue`, `helperText`,
 * `error`, `optional`, `disabled`). Inclui a variante `EmailField`.
 */
const meta = {
    title: 'Componentes/Campos/TextField',
    component: TextField,
    args: {
        label: 'Nome completo',
        name: 'nome',
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
    },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
    name: 'Padrão',
    args: {helperText: 'Como aparece na fatura'},
};

export const ComErro: Story = {
    name: 'Com erro',
    args: {
        label: 'CPF',
        name: 'cpf',
        defaultValue: '123',
        error: true,
        helperText: 'CPF inválido',
    },
};

export const Opcional: Story = {
    args: {label: 'Apelido da linha', name: 'apelido', optional: true},
};

export const Desabilitado: Story = {
    args: {label: 'Número da linha', defaultValue: '(11) 99876-5432', disabled: true},
};

export const Email: Story = {
    name: 'EmailField',
    args: {label: 'E-mail', name: 'email', helperText: 'Usado para enviar a fatura'},
    render: (args) => <EmailField {...args} />,
};
