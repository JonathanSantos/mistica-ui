import type {Meta, StoryObj} from '@storybook/react-webpack5';
import * as React from 'react';
import {fn} from 'storybook/test';

import {Autocomplete} from '@/components/mistica';

const cidades = [
    'São Paulo',
    'Rio de Janeiro',
    'Belo Horizonte',
    'Salvador',
    'Curitiba',
    'Porto Alegre',
    'Recife',
    'Fortaleza',
];

/**
 * Autocomplete do Mistica: campo com sugestões filtradas conforme o
 * usuário digita, navegação por teclado e semântica de combobox.
 * Campo controlado — exige `value` e `onChangeValue`.
 */
const meta = {
    title: 'Componentes/Campos/Autocomplete',
    component: Autocomplete,
    args: {
        label: 'Cidade',
        options: cidades,
        value: '',
        onChangeValue: fn(),
        noResultsText: 'Nenhum resultado',
        error: false,
        disabled: false,
    },
    argTypes: {
        label: {control: 'text', description: 'Rótulo flutuante do campo'},
        helperText: {control: 'text', description: 'Texto de apoio abaixo do campo'},
        error: {control: 'boolean', description: 'Estado de erro'},
        noResultsText: {control: 'text', description: 'Texto quando o filtro não encontra opções'},
        disabled: {control: 'boolean'},
        options: {control: false, description: 'Lista de sugestões (strings)'},
        value: {control: false, description: 'Valor controlado'},
    },
    render: function Render(args) {
        const [valor, setValor] = React.useState(args.value);
        return (
            <Autocomplete
                {...args}
                value={valor}
                onChangeValue={(value) => {
                    args.onChangeValue(value);
                    setValor(value);
                }}
            />
        );
    },
} satisfies Meta<typeof Autocomplete>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
    name: 'Padrão',
    args: {helperText: 'Cidade onde a linha será instalada'},
};

export const ComErro: Story = {
    name: 'Com erro',
    args: {
        value: 'Springfield',
        error: true,
        helperText: 'Escolha uma cidade atendida pela Vivo Fibra',
    },
};

export const ComValor: Story = {
    name: 'Com valor selecionado',
    args: {value: 'São Paulo'},
};

export const Desabilitado: Story = {
    args: {value: 'Curitiba', disabled: true},
};
