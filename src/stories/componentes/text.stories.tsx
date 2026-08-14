import type {Meta, StoryObj} from '@storybook/react-vite';

import {Text, Text1, Text2, Text3, Text4, Text6, Text8} from '@/components/mistica';

/**
 * `Text` do Mistica: tipografia com os text presets do skin (tamanho e
 * line-height responsivos), cor via tokens (`textPrimary`, `textSecondary`,
 * `textLink`...) e peso `light`/`regular`/`medium`/`bold`. Também existem
 * os componentes nomeados `Text1`..`Text10`, com peso por prop booleana
 * (`<Text2 medium>`).
 */
const meta = {
    title: 'Componentes/Text',
    component: Text,
    args: {
        children: 'Sua fatura de agosto já está disponível',
        preset: 'text2',
    },
    argTypes: {
        children: {control: 'text', description: 'Conteúdo do texto'},
        preset: {
            control: 'select',
            options: [
                'text1',
                'text2',
                'text3',
                'text4',
                'text5',
                'text6',
                'text7',
                'text8',
                'text9',
                'text10',
            ],
            description: 'Preset tipográfico do skin',
        },
        color: {
            control: 'select',
            options: ['primary', 'secondary', 'link', 'error', 'activated', 'brand', 'inverse'],
            description: 'Cor via token de texto',
        },
        weight: {
            control: 'select',
            options: ['light', 'regular', 'medium', 'bold'],
            description: 'Peso da fonte (sobrepõe o do preset)',
        },
        as: {control: 'text', description: 'Elemento renderizado (padrão p)'},
    },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {};

export const Escala: Story = {
    name: 'Escala text1..text10',
    render: () => (
        <div className="grid gap-2">
            {(['text10', 'text9', 'text8', 'text7', 'text6', 'text5', 'text4', 'text3', 'text2', 'text1'] as const).map(
                (preset) => (
                    <Text key={preset} preset={preset}>
                        {preset} — Planos Vivo
                    </Text>
                )
            )}
        </div>
    ),
};

export const ComponentesNomeados: Story = {
    name: 'Text1..Text10 nomeados',
    render: () => (
        <div className="grid gap-2">
            <Text8 bold>Text8 bold — Headline da oferta</Text8>
            <Text6 medium>Text6 medium — Título da página</Text6>
            <Text4 regular>Text4 regular — Subtítulo</Text4>
            <Text3 medium>Text3 medium — Destaque no corpo</Text3>
            <Text2>Text2 — Corpo padrão do Mistica</Text2>
            <Text1 color="secondary">Text1 secondary — Legenda ou nota de rodapé</Text1>
        </div>
    ),
};

export const Pesos: Story = {
    render: (args) => (
        <div className="grid gap-2">
            <Text {...args} preset="text3" weight="light">
                light — Consumo de dados
            </Text>
            <Text {...args} preset="text3" weight="regular">
                regular — Consumo de dados
            </Text>
            <Text {...args} preset="text3" weight="medium">
                medium — Consumo de dados
            </Text>
            <Text {...args} preset="text3" weight="bold">
                bold — Consumo de dados
            </Text>
        </div>
    ),
};

export const Cores: Story = {
    render: () => (
        <div className="grid gap-2">
            <Text preset="text3" color="primary">
                primary — Texto principal
            </Text>
            <Text preset="text3" color="secondary">
                secondary — Texto de apoio
            </Text>
            <Text preset="text3" color="link">
                link — Ação em texto
            </Text>
            <Text preset="text3" color="error">
                error — Fatura em atraso
            </Text>
            <Text preset="text3" color="activated">
                activated — Item selecionado
            </Text>
            <Text preset="text3" color="brand">
                brand — Cor da marca
            </Text>
            <div className="rounded-mistica-media-small bg-mistica-background-brand p-3">
                <Text preset="text3" color="inverse">
                    inverse — Sobre fundo brand
                </Text>
            </div>
        </div>
    ),
};
