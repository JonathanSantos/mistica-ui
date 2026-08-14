import type {Meta, StoryObj} from '@storybook/react-vite';
import * as React from 'react';
import {Receipt, Smartphone, Wifi} from 'lucide-react';
import {fn} from 'storybook/test';

import {Tabs, Text} from '@/components/mistica';

/**
 * Tabs do Mistica — mesma API do `@telefonica/mistica` (índice controlado):
 * `{tabs, selectedIndex, onChange, renderPanel}`.
 */
const meta = {
    title: 'Componentes/Tabs',
    component: Tabs,
    args: {
        tabs: [{text: 'Planos'}, {text: 'Faturas'}, {text: 'Consumo'}],
        selectedIndex: 0,
        onChange: fn(),
    },
    argTypes: {
        selectedIndex: {
            control: {type: 'number', min: 0, max: 2},
            description: 'Índice da aba ativa (controlado)',
        },
        tabs: {description: 'Abas: {text, icon?}'},
    },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const paineis = [
    'Compare os planos Vivo Fibra e escolha a velocidade ideal para a sua casa.',
    'Veja suas faturas em aberto e o histórico de pagamentos dos últimos meses.',
    'Acompanhe o consumo de dados da sua linha em tempo real.',
];

export const Padrao: Story = {
    name: 'Padrão',
    render: (args) => {
        const [aba, setAba] = React.useState(args.selectedIndex);
        return (
            <Tabs
                tabs={args.tabs}
                selectedIndex={aba}
                onChange={(indice) => {
                    setAba(indice);
                    args.onChange(indice);
                }}
                renderPanel={(indice) => <Text preset="text2">{paineis[indice]}</Text>}
            />
        );
    },
};

export const ComIcones: Story = {
    name: 'Com ícones',
    args: {
        tabs: [
            {text: 'Fibra', icon: <Wifi className="size-5" />},
            {text: 'Móvel', icon: <Smartphone className="size-5" />},
            {text: 'Faturas', icon: <Receipt className="size-5" />},
        ],
    },
    render: (args) => {
        const [aba, setAba] = React.useState(0);
        return (
            <Tabs
                tabs={args.tabs}
                selectedIndex={aba}
                onChange={(indice) => {
                    setAba(indice);
                    args.onChange(indice);
                }}
            />
        );
    },
};

export const IndiceControlado: Story = {
    name: 'Índice via controls',
    // Sem estado local: `selectedIndex` vem dos controls e os cliques
    // aparecem no painel Actions (componente 100% controlado).
};
