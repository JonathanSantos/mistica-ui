import type {Meta, StoryObj} from '@storybook/react-vite';
import {fn} from 'storybook/test';

import {DateField, DateTimeField, MonthField, TimeField} from '@/components/mistica';

/**
 * Campos de data e hora do Mistica: `DateField` (data nativa com o frame do
 * `TextField`) e as variantes `TimeField`, `MonthField` e `DateTimeField`.
 * O label fica sempre flutuado, pois inputs de data sempre mostram conteúdo.
 */
const meta = {
    title: 'Componentes/Campos/Data e hora',
    component: DateField,
    args: {
        label: 'Data de nascimento',
        onChangeValue: fn(),
        error: false,
        optional: false,
        disabled: false,
    },
    argTypes: {
        label: {control: 'text', description: 'Rótulo do campo (sempre flutuado)'},
        helperText: {control: 'text', description: 'Texto auxiliar abaixo do campo'},
        error: {control: 'boolean', description: 'Estado de erro'},
        optional: {control: 'boolean', description: 'Marca "(opcional)" no label'},
        disabled: {control: 'boolean'},
    },
} satisfies Meta<typeof DateField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Data: Story = {
    name: 'DateField',
};

export const Hora: Story = {
    name: 'TimeField',
    args: {
        label: 'Horário da visita técnica',
    },
    render: (args) => <TimeField {...args} />,
};

export const MesEAno: Story = {
    name: 'MonthField',
    args: {
        label: 'Competência da fatura',
        helperText: 'Mês e ano de referência',
    },
    render: (args) => <MonthField {...args} />,
};

export const DataEHora: Story = {
    name: 'DateTimeField',
    args: {
        label: 'Agendamento da portabilidade',
    },
    render: (args) => <DateTimeField {...args} />,
};

export const ComErro: Story = {
    name: 'Com erro',
    args: {
        error: true,
        helperText: 'Escolha uma data futura',
        defaultValue: '2020-01-01',
    },
};

export const Desabilitado: Story = {
    args: {
        disabled: true,
        defaultValue: '2026-08-14',
    },
};
