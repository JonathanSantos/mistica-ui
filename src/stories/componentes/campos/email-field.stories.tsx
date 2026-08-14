import type {Meta, StoryObj} from '@storybook/react-vite';
import {fn} from 'storybook/test';

import {EmailField} from '@/components/mistica';

/**
 * `EmailField` do Mistica: `TextField` de e-mail com teclado e autocomplete
 * corretos — mesma API do `@telefonica/mistica` (`label`, `helperText`,
 * `error`, `optional`, `onChangeValue`).
 */
const meta = {
    title: 'Componentes/Campos/EmailField',
    component: EmailField,
    args: {
        label: 'E-mail',
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
} satisfies Meta<typeof EmailField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
    name: 'Padrão',
};

export const ComTextoDeAjuda: Story = {
    name: 'Com helperText',
    args: {
        helperText: 'Enviaremos a fatura da sua linha para este e-mail',
    },
};

export const ComErro: Story = {
    name: 'Com erro',
    args: {
        error: true,
        helperText: 'Digite um e-mail válido',
        defaultValue: 'cliente@vivo',
    },
};

export const Opcional: Story = {
    args: {
        label: 'E-mail para contato',
        optional: true,
    },
};

export const Desabilitado: Story = {
    args: {
        disabled: true,
        defaultValue: 'cliente@vivo.com.br',
    },
};
