import type {Meta, StoryObj} from '@storybook/react-webpack5';
import * as React from 'react';
import {fn} from 'storybook/test';

import {Checkbox, Text} from '@/components/mistica';

/**
 * Checkbox do Mistica — mesma API do `@telefonica/mistica`:
 * `checked`/`defaultChecked`, `onChange(checked)` e `children` como
 * rótulo clicável.
 */
const meta = {
    title: 'Componentes/Checkbox',
    component: Checkbox,
    args: {
        children: 'Aceito os termos e condições',
        onChange: fn(),
        defaultChecked: false,
        disabled: false,
    },
    argTypes: {
        children: {control: 'text', description: 'Rótulo clicável ao lado do checkbox'},
        defaultChecked: {control: 'boolean'},
        disabled: {control: 'boolean'},
        name: {control: 'text', description: 'Nome do campo no formulário'},
    },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
    name: 'Padrão',
};

export const Marcado: Story = {
    args: {defaultChecked: true, children: 'Receber a fatura por e-mail'},
};

export const Desabilitado: Story = {
    args: {disabled: true, defaultChecked: true, children: 'Débito automático (gerenciado pelo titular)'},
};

export const SemRotulo: Story = {
    name: 'Sem rótulo',
    render: () => <Checkbox aria-label="Selecionar linha" defaultChecked />,
};

export const Controlado: Story = {
    render: (args) => {
        const [marcado, setMarcado] = React.useState(false);
        return (
            <div className="grid gap-3">
                <Checkbox
                    checked={marcado}
                    onChange={(checked) => {
                        setMarcado(checked);
                        args.onChange?.(checked);
                    }}
                >
                    Quero receber ofertas da Vivo por WhatsApp
                </Checkbox>
                <Text preset="text1" color="secondary">
                    {marcado ? 'Você receberá nossas ofertas.' : 'Marque para receber ofertas.'}
                </Text>
            </div>
        );
    },
};
