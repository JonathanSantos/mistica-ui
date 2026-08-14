import type {Meta, StoryObj} from '@storybook/react-webpack5';
import {Bell} from 'lucide-react';

import {Badge, IconButton} from '@/components/mistica';

/**
 * Badge do Mistica: indicador numérico (ou só o ponto, quando `value` é
 * omitido). Sem children renderiza standalone; com children posiciona o
 * indicador no canto superior direito do conteúdo.
 */
const meta = {
    title: 'Componentes/Badge',
    component: Badge,
    argTypes: {
        value: {
            control: 'number',
            description: 'Quantidade exibida (acima de 9 vira "+9"; omitida mostra só o ponto)',
        },
    },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
    name: 'Padrão',
    args: {value: 2},
};

export const SoOPonto: Story = {
    name: 'Só o ponto',
    render: () => <Badge />,
};

export const MaisDeNove: Story = {
    name: 'Mais de nove',
    args: {value: 12},
};

export const SobreUmIcone: Story = {
    name: 'Sobre um ícone',
    args: {value: 4},
    render: (args) => (
        <Badge {...args}>
            <IconButton Icon={Bell} aria-label="Notificações" />
        </Badge>
    ),
};
