import type {Meta, StoryObj} from '@storybook/react-webpack5';
import {fn} from 'storybook/test';

import {openSnackbar, Text, TextTimer, Timer} from '@/components/mistica';

/**
 * `Timer` e `TextTimer` do Mistica: contagem regressiva até `endTimestamp`
 * (ms). `Timer` mostra as unidades em caixas com labels; `TextTimer`
 * renderiza texto corrido ("01d 02h 03min"). `hideEmptyUnits` esconde
 * unidades zeradas à esquerda e `onFinish` dispara ao chegar em zero.
 */
const meta = {
    title: 'Componentes/Timer',
    component: Timer,
    args: {
        endTimestamp: Date.now() + 26 * 3600 * 1000 + 42 * 60 * 1000 + 17 * 1000,
        hideEmptyUnits: true,
        onFinish: fn(),
    },
    argTypes: {
        endTimestamp: {control: 'number', description: 'Timestamp (ms) do fim da contagem'},
        hideEmptyUnits: {control: 'boolean', description: 'Esconde unidades zeradas à esquerda'},
    },
} satisfies Meta<typeof Timer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
    name: 'Timer',
};

export const ComDias: Story = {
    name: 'Com dias',
    args: {endTimestamp: Date.now() + 3 * 86400 * 1000 + 5 * 3600 * 1000},
};

export const SemOcultarUnidades: Story = {
    name: 'Sem ocultar unidades',
    args: {
        endTimestamp: Date.now() + 12 * 60 * 1000,
        hideEmptyUnits: false,
    },
};

export const EmTexto: Story = {
    name: 'TextTimer',
    render: (args) => (
        <Text preset="text2">
            A oferta do plano Vivo Total termina em <TextTimer {...args} className="font-medium" />
        </Text>
    ),
};

export const ComCallback: Story = {
    name: 'Com onFinish',
    args: {
        endTimestamp: Date.now() + 15 * 1000,
        onFinish: fn(() => openSnackbar({message: 'Tempo esgotado! A oferta expirou.'})),
    },
    render: (args) => (
        <div className="grid gap-2">
            <Timer {...args} />
            <Text preset="text1" color="secondary">
                Ao zerar, abre um snackbar via onFinish.
            </Text>
        </div>
    ),
};
