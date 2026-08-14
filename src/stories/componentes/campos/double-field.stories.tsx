import type {Meta, StoryObj} from '@storybook/react-vite';

import {DoubleField, Select, TextField} from '@/components/mistica';

/**
 * DoubleField do Mistica: coloca dois campos lado a lado (empilhados no
 * mobile). É um contêiner de layout — as props de formulário (`label`,
 * `name`, `error`, `optional`...) ficam nos campos filhos.
 */
const meta = {
    title: 'Componentes/Campos/DoubleField',
    component: DoubleField,
    argTypes: {
        children: {control: false, description: 'Os dois campos a exibir lado a lado'},
    },
} satisfies Meta<typeof DoubleField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
    name: 'Padrão',
    render: () => (
        <DoubleField>
            <TextField label="Nome" name="nome" />
            <TextField label="Sobrenome" name="sobrenome" />
        </DoubleField>
    ),
};

export const ComSelect: Story = {
    name: 'Com Select',
    render: () => (
        <DoubleField>
            <Select
                label="DDD"
                name="ddd"
                options={[
                    {value: '11', text: '11 — São Paulo'},
                    {value: '21', text: '21 — Rio de Janeiro'},
                    {value: '31', text: '31 — Belo Horizonte'},
                ]}
            />
            <TextField label="Número" name="numero" inputMode="numeric" />
        </DoubleField>
    ),
};

export const ErroEOpcional: Story = {
    name: 'Com erro e opcional',
    render: () => (
        <DoubleField>
            <TextField
                label="CEP"
                name="cep"
                defaultValue="123"
                error
                helperText="CEP inválido"
            />
            <TextField label="Complemento" name="complemento" optional />
        </DoubleField>
    ),
};
