import type {Meta, StoryObj} from '@storybook/react-vite';
import {fn} from 'storybook/test';

import {SearchField} from '@/components/mistica';

/**
 * SearchField do Mistica: campo de busca com ícone de lupa e botão de
 * limpar quando há valor (`onClear`). Mesma API de campo do TextField
 * (`label`, `name`, `onChangeValue`, `helperText`, `error`, `optional`).
 */
const meta = {
    title: 'Componentes/Campos/SearchField',
    component: SearchField,
    args: {
        label: 'Buscar planos',
        name: 'busca',
        onChangeValue: fn(),
        onClear: fn(),
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
        onClear: {description: 'Chamado ao clicar no botão de limpar'},
    },
} satisfies Meta<typeof SearchField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
    name: 'Padrão',
    args: {helperText: 'Busque por nome do plano ou franquia'},
};

export const ComValor: Story = {
    name: 'Com valor (botão limpar)',
    args: {defaultValue: 'Vivo Fibra 500 Mega'},
};

export const ComErro: Story = {
    name: 'Com erro',
    args: {
        defaultValue: '@@@',
        error: true,
        helperText: 'Use apenas letras e números na busca',
    },
};

export const Opcional: Story = {
    args: {label: 'Filtrar faturas', optional: true},
};

export const Desabilitado: Story = {
    args: {disabled: true},
};
