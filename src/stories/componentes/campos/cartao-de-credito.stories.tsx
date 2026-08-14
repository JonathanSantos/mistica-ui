import * as React from 'react';
import type {Meta, StoryObj} from '@storybook/react-vite';
import {fn} from 'storybook/test';

import {
    CreditCardExpirationField,
    CreditCardFields,
    CreditCardNumberField,
    CvvField,
    Text,
    type ExpirationDateValue,
} from '@/components/mistica';

/**
 * Campos de cartão de crédito do Mistica: `CreditCardNumberField` (grupos de
 * 4 dígitos), `CreditCardExpirationField` (MM/AA, `onChangeValue` entrega
 * `{raw, month, year}`) e `CvvField`, além do agrupamento pronto
 * `CreditCardFields`.
 */
const meta = {
    title: 'Componentes/Campos/Cartão de crédito',
    component: CreditCardNumberField,
    args: {
        label: 'Número do cartão',
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
} satisfies Meta<typeof CreditCardNumberField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Numero: Story = {
    name: 'CreditCardNumberField',
};

export const Validade: Story = {
    name: 'CreditCardExpirationField',
    render: function Render() {
        const [validade, setValidade] = React.useState<ExpirationDateValue | null>(null);
        return (
            <div className="grid max-w-48 gap-2">
                <CreditCardExpirationField
                    label="Validade"
                    helperText="MM/AA"
                    onChangeValue={setValidade}
                />
                <Text preset="text1" color="secondary">
                    {validade?.month !== null && validade?.month !== undefined
                        ? `Mês ${validade.month}, ano ${validade.year}`
                        : 'Digite a validade para ver {raw, month, year}'}
                </Text>
            </div>
        );
    },
};

export const Cvv: Story = {
    name: 'CvvField',
    render: () => (
        <div className="max-w-48">
            <CvvField label="CVV" helperText="3 ou 4 dígitos" onChangeValue={fn()} />
        </div>
    ),
};

export const ComErro: Story = {
    name: 'Com erro',
    args: {
        error: true,
        helperText: 'Número de cartão inválido',
        defaultValue: '1234 5678',
    },
};

export const Agrupamento: Story = {
    name: 'CreditCardFields',
    render: () => <CreditCardFields className="max-w-md" />,
};
