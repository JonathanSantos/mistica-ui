import type {Meta, StoryObj} from '@storybook/react-webpack5';
import * as React from 'react';
import {fn} from 'storybook/test';

import {RadioButton, RadioGroup, Text} from '@/components/mistica';

/**
 * RadioGroup / RadioButton do Mistica — mesma API do `@telefonica/mistica`:
 * `RadioGroup {name, value, defaultValue, onChange(value)}` e
 * `RadioButton {value}` com `children` como rótulo clicável.
 */
const meta = {
    title: 'Componentes/Radio Button',
    component: RadioGroup,
    args: {
        name: 'plano',
        defaultValue: 'fibra',
        onChange: fn(),
        disabled: false,
        children: (
            <>
                <RadioButton value="fibra">Vivo Fibra 500 Mega</RadioButton>
                <RadioButton value="movel">Vivo Móvel 25 GB</RadioButton>
                <RadioButton value="total">Vivo Total (fibra + móvel)</RadioButton>
            </>
        ),
    },
    argTypes: {
        children: {control: false, description: 'RadioButtons do grupo'},
        defaultValue: {control: 'text'},
        disabled: {control: 'boolean', description: 'Desabilita o grupo inteiro'},
        name: {control: 'text', description: 'Nome do campo no formulário'},
    },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
    name: 'Padrão',
};

export const Desabilitado: Story = {
    args: {disabled: true},
};

export const ItemDesabilitado: Story = {
    name: 'Com item desabilitado',
    render: (args) => (
        <RadioGroup name="fatura" defaultValue="email" onChange={args.onChange}>
            <RadioButton value="email">Fatura por e-mail</RadioButton>
            <RadioButton value="correio">Fatura pelos correios</RadioButton>
            <RadioButton value="whatsapp" disabled>
                Fatura por WhatsApp (em breve)
            </RadioButton>
        </RadioGroup>
    ),
};

export const Controlado: Story = {
    render: (args) => {
        const [plano, setPlano] = React.useState('fibra');
        return (
            <div className="grid gap-4">
                <RadioGroup
                    name="plano-controlado"
                    value={plano}
                    onChange={(valor) => {
                        setPlano(valor);
                        args.onChange?.(valor);
                    }}
                >
                    <RadioButton value="fibra">Vivo Fibra 500 Mega</RadioButton>
                    <RadioButton value="movel">Vivo Móvel 25 GB</RadioButton>
                    <RadioButton value="total">Vivo Total (fibra + móvel)</RadioButton>
                </RadioGroup>
                <Text preset="text1" color="secondary">
                    Selecionado: {plano}
                </Text>
            </div>
        );
    },
};
