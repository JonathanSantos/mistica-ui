import * as React from 'react';
import type {Meta, StoryObj} from '@storybook/react-vite';
import {fn} from 'storybook/test';

import {
    ButtonLink,
    ButtonPrimary,
    MasterDetailLayout,
    Placeholder,
    Row,
    RowList,
    Text,
} from '@/components/mistica';

/**
 * `MasterDetailLayout`: lista (master) à esquerda e detalhe à direita no
 * desktop; no mobile mostra um por vez (`isDetailOpen` + `onGoBack`) — o
 * layout típico de telas internas densas.
 */
const meta = {
    title: 'Layout/MasterDetailLayout',
    component: MasterDetailLayout,
    args: {
        isDetailOpen: false,
        onGoBack: fn(),
        masterWidth: 320,
        master: (
            <RowList noDividers>
                <Row title="Vivo Pós" subtitle="(11) 99999-0000 — 50 GB" onPress={fn()} />
                <Row title="Vivo Fibra" subtitle="Av. Paulista, 1000 — 700 Mega" onPress={fn()} />
                <Row title="Vivo Play" subtitle="120 canais + apps" onPress={fn()} />
            </RowList>
        ),
        children: (
            <div className="p-4 lg:p-6">
                <Placeholder height={220} />
            </div>
        ),
    },
    argTypes: {
        isDetailOpen: {
            control: 'boolean',
            description: 'No mobile, mostra o detalhe no lugar da lista',
        },
        masterWidth: {control: 'number', description: 'Largura da coluna master no desktop (px)'},
        master: {control: false},
        children: {control: false},
    },
    render: (args) => (
        <div className="overflow-hidden rounded-mistica-media-small border border-mistica-border">
            <MasterDetailLayout {...args} />
        </div>
    ),
} satisfies Meta<typeof MasterDetailLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
    name: 'Padrão',
};

export const MasterLargo: Story = {
    name: 'Master de 400px',
    args: {masterWidth: 400},
};

const LINHAS = [
    {id: 'movel', nome: 'Vivo Pós', detalhe: '(11) 99999-0000 — 50 GB'},
    {id: 'fibra', nome: 'Vivo Fibra', detalhe: 'Av. Paulista, 1000 — 700 Mega'},
    {id: 'tv', nome: 'Vivo Play', detalhe: '120 canais + apps'},
];

export const Interativo: Story = {
    name: 'Interativo',
    render: (args) => {
        const [selecionada, setSelecionada] = React.useState<string | null>('movel');
        const linha = LINHAS.find((l) => l.id === selecionada);

        return (
            <div className="overflow-hidden rounded-mistica-media-small border border-mistica-border">
                <MasterDetailLayout
                    {...args}
                    isDetailOpen={selecionada !== null}
                    onGoBack={() => setSelecionada(null)}
                    master={
                        <RowList noDividers>
                            {LINHAS.map((l) => (
                                <Row
                                    key={l.id}
                                    title={l.nome}
                                    subtitle={l.detalhe}
                                    onPress={() => setSelecionada(l.id)}
                                />
                            ))}
                        </RowList>
                    }
                >
                    <div className="grid gap-3 p-4 lg:p-6">
                        <Text preset="text4">{linha?.nome ?? 'Selecione uma linha'}</Text>
                        <Text preset="text2" color="secondary">
                            {linha?.detalhe ?? 'Escolha um serviço na lista para ver os detalhes.'}
                        </Text>
                        {linha ? (
                            <div className="flex gap-3">
                                <ButtonPrimary small onPress={() => {}}>
                                    Gerenciar
                                </ButtonPrimary>
                                <ButtonLink onPress={() => {}}>Ver fatura</ButtonLink>
                            </div>
                        ) : null}
                    </div>
                </MasterDetailLayout>
            </div>
        );
    },
};
