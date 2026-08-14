import type {Meta, StoryObj} from '@storybook/react-webpack5';
import {fn} from 'storybook/test';

import {PasswordField} from '@/components/mistica';

/**
 * PasswordField do Mistica: TextField com alternância de visibilidade
 * (ícone de olho). Mesma API de campo do `@telefonica/mistica`
 * (`label`, `name`, `onChangeValue`, `helperText`, `error`, `optional`).
 */
const meta = {
    title: 'Componentes/Campos/PasswordField',
    component: PasswordField,
    args: {
        label: 'Senha',
        name: 'senha',
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
} satisfies Meta<typeof PasswordField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
    name: 'Padrão',
    args: {helperText: 'Mínimo de 8 caracteres'},
};

export const ComValor: Story = {
    name: 'Com valor (olho ativo)',
    args: {defaultValue: 'minha-senha-123'},
};

export const ComErro: Story = {
    name: 'Com erro',
    args: {
        defaultValue: '1234',
        error: true,
        helperText: 'Senha incorreta. Tente novamente',
    },
};

export const Opcional: Story = {
    args: {label: 'Senha do modem', optional: true},
};

export const Desabilitado: Story = {
    args: {defaultValue: 'senha-salva', disabled: true},
};
