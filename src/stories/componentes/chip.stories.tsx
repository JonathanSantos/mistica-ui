import * as React from 'react';
import type {Meta, StoryObj} from '@storybook/react-webpack5';
import {fn} from 'storybook/test';
import {Flame} from 'lucide-react';

import {Chip} from '@/components/mistica';

/**
 * Chip do Mistica: pílula selecionável para filtros e escolhas rápidas, com
 * `active`, ícone opcional, `badge` (ponto ou contador) e `onClose` (fechável).
 */
const meta = {
    title: 'Componentes/Chip',
    component: Chip,
    args: {
        children: 'Ofertas',
        active: false,
        onPress: fn(),
        disabled: false,
    },
    argTypes: {
        children: {control: 'text', description: 'Rótulo do chip'},
        active: {control: 'boolean', description: 'Estado selecionado'},
        badge: {control: 'number', description: 'Número mostra contador; true mostra só o ponto'},
        disabled: {control: 'boolean'},
    },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
    name: 'Padrão',
};

export const Ativo: Story = {
    args: {active: true},
};

export const ComIcone: Story = {
    name: 'Com ícone',
    args: {Icon: Flame, children: 'Em alta'},
};

export const ComBadge: Story = {
    name: 'Com badge',
    args: {children: 'Notificações', badge: 3},
};

export const Fechavel: Story = {
    name: 'Fechável',
    args: {children: 'Plano Controle', onClose: fn()},
};

export const GrupoDeFiltros: Story = {
    name: 'Grupo de filtros',
    render: () => {
        const [selecionados, setSelecionados] = React.useState<Array<string>>(['Planos']);
        const alternar = (filtro: string) =>
            setSelecionados((atuais) =>
                atuais.includes(filtro) ? atuais.filter((item) => item !== filtro) : [...atuais, filtro]
            );
        return (
            <div className="flex flex-wrap gap-2">
                {['Planos', 'Fibra', 'Roaming', 'Vivo Play'].map((filtro) => (
                    <Chip
                        key={filtro}
                        active={selecionados.includes(filtro)}
                        onPress={() => alternar(filtro)}
                    >
                        {filtro}
                    </Chip>
                ))}
            </div>
        );
    },
};
