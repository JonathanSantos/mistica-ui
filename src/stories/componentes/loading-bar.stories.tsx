import type {Meta, StoryObj} from '@storybook/react-vite';
import * as React from 'react';

import {ButtonSecondary, LoadingBar, Text} from '@/components/mistica';

/**
 * `LoadingBar` do Mistica: barra de carregamento indeterminada de 4px.
 * Por padrão fica fixa no topo da página (`fixed`); com `fixed={false}`
 * renderiza no fluxo, útil para demonstrações.
 */
const meta = {
    title: 'Componentes/LoadingBar',
    component: LoadingBar,
    args: {
        visible: true,
        fixed: false,
    },
    argTypes: {
        visible: {control: 'boolean', description: 'Mostra ou esconde a barra'},
        fixed: {control: 'boolean', description: 'Fixa no topo da página (padrão true)'},
    },
} satisfies Meta<typeof LoadingBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
    name: 'No fluxo',
    render: (args) => (
        <div className="overflow-hidden rounded-mistica-media-small border border-mistica-border">
            <LoadingBar {...args} />
        </div>
    ),
};

export const FixaNoTopo: Story = {
    name: 'Fixa no topo',
    render: () => <DemoFixaNoTopo />,
};

function DemoFixaNoTopo() {
    const [loading, setLoading] = React.useState(false);

    return (
        <div className="grid gap-3">
            <LoadingBar visible={loading} />
            <ButtonSecondary
                small
                onPress={() => {
                    setLoading(true);
                    setTimeout(() => setLoading(false), 4000);
                }}
            >
                Simular carregamento (4s)
            </ButtonSecondary>
            <Text preset="text1" color="secondary">
                A barra aparece fixa no topo da janela enquanto carrega.
            </Text>
        </div>
    );
}
