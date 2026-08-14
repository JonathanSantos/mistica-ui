import type {Meta, StoryObj} from '@storybook/react-vite';

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    Tag,
} from '@/components/mistica';

const linhas = (
    <>
        <TableHeader>
            <TableRow>
                <TableHead>Plano</TableHead>
                <TableHead>Franquia</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Status</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow>
                <TableCell>Vivo Easy</TableCell>
                <TableCell>10 GB</TableCell>
                <TableCell>R$ 34,99</TableCell>
                <TableCell>
                    <Tag type="success">Ativo</Tag>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell>Vivo Controle</TableCell>
                <TableCell>25 GB</TableCell>
                <TableCell>R$ 54,99</TableCell>
                <TableCell>
                    <Tag type="warning">Pendente</Tag>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell>Vivo Pós</TableCell>
                <TableCell>50 GB</TableCell>
                <TableCell>R$ 99,99</TableCell>
                <TableCell>
                    <Tag type="inactive">Cancelado</Tag>
                </TableCell>
            </TableRow>
        </TableBody>
    </>
);

/**
 * `Table` do Mistica: cabeçalho em texto secundário, linhas com divider e
 * variante `boxed` (container com borda e radius). Composição shadcn:
 * `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell` e
 * `TableCaption`.
 */
const meta = {
    title: 'Componentes/Table',
    component: Table,
    args: {
        boxed: true,
        children: linhas,
    },
    argTypes: {
        boxed: {control: 'boolean', description: 'Envolve a tabela em um container boxed'},
        children: {control: false},
    },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
    name: 'Padrão (boxed)',
};

export const SemCaixa: Story = {
    name: 'Sem caixa',
    args: {boxed: false},
};

export const ComLegenda: Story = {
    name: 'Com legenda',
    render: (args) => (
        <Table {...args}>
            {linhas}
            <TableCaption>Valores vigentes para contratações em agosto de 2026.</TableCaption>
        </Table>
    ),
};
