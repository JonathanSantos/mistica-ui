import * as React from 'react';
import type {Meta, StoryObj} from '@storybook/react-vite';
import {fn} from 'storybook/test';

import {openSnackbar, PinField, Text} from '@/components/mistica';

/**
 * `PinField` do Mistica: caixas de dígito único com avanço automático para
 * códigos OTP/PIN. `onValueChange` recebe o valor a cada dígito e
 * `onComplete` dispara quando todos os dígitos foram preenchidos.
 */
const meta = {
    title: 'Componentes/Campos/PinField',
    component: PinField,
    args: {
        length: 6,
        hideCode: false,
        disabled: false,
        onValueChange: fn(),
        onComplete: fn(),
    },
    argTypes: {
        length: {control: 'number', description: 'Quantidade de dígitos'},
        hideCode: {control: 'boolean', description: 'Esconde os dígitos (senha)'},
        disabled: {control: 'boolean'},
        'aria-label': {control: 'text', description: 'Rótulo acessível do campo'},
    },
} satisfies Meta<typeof PinField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
    name: 'Padrão',
};

export const QuatroDigitos: Story = {
    name: 'Quatro dígitos',
    args: {
        length: 4,
    },
};

export const CodigoOculto: Story = {
    name: 'Com hideCode',
    args: {
        hideCode: true,
        'aria-label': 'Senha do cartão',
    },
};

export const Controlado: Story = {
    render: function Render(args) {
        const [codigo, setCodigo] = React.useState('');
        return (
            <div className="grid gap-3">
                <Text preset="text2" color="secondary">
                    Digite o código SMS enviado para (11) 91234-5678
                </Text>
                <PinField
                    {...args}
                    value={codigo}
                    onValueChange={setCodigo}
                    onComplete={(valor) => openSnackbar({message: `Código ${valor} verificado`})}
                />
                <Text preset="text1" color="secondary">
                    {codigo ? `Digitado: ${codigo}` : 'Aguardando código...'}
                </Text>
            </div>
        );
    },
};

export const Desabilitado: Story = {
    args: {
        disabled: true,
        value: '123',
    },
};
