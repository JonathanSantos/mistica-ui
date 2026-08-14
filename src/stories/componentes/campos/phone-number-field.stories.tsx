import * as React from 'react';
import type {Meta, StoryObj} from '@storybook/react-webpack5';
import {fn} from 'storybook/test';

import {PhoneNumberField, Text} from '@/components/mistica';

/**
 * `PhoneNumberField` do Mistica: `TextField` com máscara de telefone BR
 * (`(11) 91234-5678`) e teclado numérico no mobile. `onChangeValue` recebe
 * o valor já mascarado.
 */
const meta = {
    title: 'Componentes/Campos/PhoneNumberField',
    component: PhoneNumberField,
    args: {
        label: 'Celular',
        helperText: 'Com DDD',
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
} satisfies Meta<typeof PhoneNumberField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
    name: 'Padrão',
};

export const Controlado: Story = {
    render: function Render(args) {
        const [telefone, setTelefone] = React.useState('');
        return (
            <div className="grid max-w-sm gap-2">
                <PhoneNumberField {...args} value={telefone} onChangeValue={setTelefone} />
                <Text preset="text1" color="secondary">
                    {telefone ? `Valor mascarado: ${telefone}` : 'Digite um número para ver a máscara'}
                </Text>
            </div>
        );
    },
};

export const ComErro: Story = {
    name: 'Com erro',
    args: {
        error: true,
        helperText: 'Número incompleto',
        defaultValue: '(11) 9',
    },
};

export const Opcional: Story = {
    args: {
        label: 'Telefone fixo',
        helperText: undefined,
        optional: true,
    },
};

export const Desabilitado: Story = {
    args: {
        disabled: true,
        defaultValue: '(11) 91234-5678',
    },
};
