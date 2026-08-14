import type {Meta, StoryObj} from '@storybook/react-webpack5';
import {fn} from 'storybook/test';

import {InfoRating, Rating} from '@/components/mistica';

/**
 * Rating do Mistica: estrelas selecionáveis com `value`/`defaultValue`,
 * `onChangeValue`, `count` e `size` — mesma API do `@telefonica/mistica`.
 * Para exibição somente leitura use o `InfoRating` (com meia estrela via
 * `withHalfValue`).
 */
const meta = {
    title: 'Componentes/Rating',
    component: Rating,
    args: {
        defaultValue: 3,
        onChangeValue: fn(),
        count: 5,
        size: 32,
        disabled: false,
    },
    argTypes: {
        defaultValue: {control: 'number', description: 'Estrelas preenchidas (não controlado)'},
        count: {control: 'number', description: 'Total de estrelas'},
        size: {control: 'number', description: 'Tamanho de cada estrela em px'},
        disabled: {control: 'boolean'},
    },
} satisfies Meta<typeof Rating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
    name: 'Padrão',
};

export const DezEstrelas: Story = {
    name: 'Com 10 estrelas',
    args: {defaultValue: 7, count: 10, size: 24},
};

export const Desabilitado: Story = {
    args: {defaultValue: 2, disabled: true},
};

export const Exibicao: Story = {
    name: 'InfoRating (exibição)',
    render: () => <InfoRating value={4.5} withHalfValue aria-label="Nota do atendimento" />,
};
