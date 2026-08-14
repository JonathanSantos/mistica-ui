import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {Placeholder, ScreenReaderOnly, SkipLink, Stack, Text} from '@/components/mistica';

/**
 * Utilitários de acessibilidade do Mistica: `SkipLink` (link "pular para o
 * conteúdo", invisível até receber foco por teclado) e `ScreenReaderOnly`
 * (conteúdo apenas para leitores de tela).
 */
const meta = {
    title: 'Utilitários/Acessibilidade',
    component: SkipLink,
    args: {
        targetId: 'conteudo-principal',
        children: 'Pular para o conteúdo',
    },
    argTypes: {
        targetId: {control: 'text', description: 'id do elemento de destino (sem #)'},
        children: {control: 'text', description: 'Texto do link'},
    },
} satisfies Meta<typeof SkipLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PularParaConteudo: Story = {
    name: 'SkipLink',
    render: (args) => (
        <Stack space={16}>
            <SkipLink {...args} />
            <Text preset="text2" color="secondary">
                Pressione Tab nesta área para revelar o link "{args.children}" no canto superior
                esquerdo; Enter leva o foco ao destino.
            </Text>
            <div id={args.targetId} tabIndex={-1}>
                <Placeholder height={120} />
            </div>
        </Stack>
    ),
};

export const ApenasLeitorDeTela: Story = {
    name: 'ScreenReaderOnly',
    render: () => (
        <Stack space={8}>
            <Text preset="text3" weight="medium">
                Fatura de agosto — R$ 99,99
                <ScreenReaderOnly> — vence em 20 de agosto de 2026</ScreenReaderOnly>
            </Text>
            <Text preset="text2" color="secondary">
                O trecho com a data de vencimento existe apenas para leitores de tela — inspecione
                o DOM para vê-lo.
            </Text>
        </Stack>
    ),
};
