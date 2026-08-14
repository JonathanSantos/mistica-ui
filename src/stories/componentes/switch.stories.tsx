import type {Meta, StoryObj} from '@storybook/react-webpack5';
import * as React from 'react';
import {fn} from 'storybook/test';

import {Switch, Text} from '@/components/mistica';

/**
 * Switch do Mistica (estilo Android, como o mistica-web renderiza) —
 * mesma API do `@telefonica/mistica`: `checked`/`defaultChecked`,
 * `onChange(checked)` e `children` como rótulo clicável.
 */
const meta = {
    title: 'Componentes/Switch',
    component: Switch,
    args: {
        children: 'Roaming internacional',
        onChange: fn(),
        defaultChecked: false,
        disabled: false,
    },
    argTypes: {
        children: {control: 'text', description: 'Rótulo clicável ao lado do switch'},
        defaultChecked: {control: 'boolean'},
        disabled: {control: 'boolean'},
        name: {control: 'text', description: 'Nome do campo no formulário'},
    },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
    name: 'Padrão',
};

export const Ligado: Story = {
    args: {defaultChecked: true, children: 'Renovação automática do plano'},
};

export const Desabilitado: Story = {
    args: {disabled: true, defaultChecked: true, children: 'Rede 5G (indisponível na sua região)'},
};

export const SemRotulo: Story = {
    name: 'Sem rótulo',
    render: () => <Switch aria-label="Ativar notificações" defaultChecked />,
};

export const Controlado: Story = {
    render: (args) => {
        const [ativo, setAtivo] = React.useState(true);
        return (
            <div className="grid gap-3">
                <Switch
                    checked={ativo}
                    onChange={(checked) => {
                        setAtivo(checked);
                        args.onChange?.(checked);
                    }}
                >
                    Dados móveis
                </Switch>
                <Text preset="text1" color="secondary">
                    {ativo ? 'Dados móveis ativados.' : 'Dados móveis desativados.'}
                </Text>
            </div>
        );
    },
};
