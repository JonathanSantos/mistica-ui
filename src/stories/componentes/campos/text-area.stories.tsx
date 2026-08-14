import type {Meta, StoryObj} from '@storybook/react-vite';
import {fn} from 'storybook/test';

import {TextArea} from '@/components/mistica';

/**
 * TextArea do Mistica: mesmo frame do TextField (label flutuante), em
 * multilinha — API idêntica ao `@telefonica/mistica` (`label`, `name`,
 * `onChangeValue`, `helperText`, `error`, `optional`), mais `rows`.
 */
const meta = {
    title: 'Componentes/Campos/TextArea',
    component: TextArea,
    args: {
        label: 'Mensagem',
        name: 'mensagem',
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
        rows: {control: 'number', description: 'Linhas visíveis (padrão 4)'},
    },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
    name: 'Padrão',
    args: {helperText: 'Conte pra gente o que aconteceu'},
};

export const ComErro: Story = {
    name: 'Com erro',
    args: {
        label: 'Descrição do problema',
        defaultValue: 'Sem sinal',
        error: true,
        helperText: 'Descreva o problema com pelo menos 20 caracteres',
    },
};

export const Opcional: Story = {
    args: {label: 'Observações da visita técnica', optional: true},
};

export const MaisLinhas: Story = {
    name: 'Com rows customizado',
    args: {label: 'Detalhes da reclamação', rows: 8},
};

export const Desabilitado: Story = {
    args: {defaultValue: 'Protocolo 2026-0814 em análise.', disabled: true},
};
