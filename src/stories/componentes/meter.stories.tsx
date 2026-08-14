import type {Meta, StoryObj} from '@storybook/react-vite';

import {Meter, Text} from '@/components/mistica';

/**
 * `Meter` do Mistica (tipo linear): barra segmentada sobre o trilho
 * barTrack. Cada seção recebe um valor de 0 a 1 (a soma é limitada a 1)
 * e opcionalmente uma cor; a paleta padrão segue o skin.
 */
const meta = {
    title: 'Componentes/Visualização de dados/Meter',
    component: Meter,
    args: {
        values: [0.35, 0.2, 0.1],
        'aria-label': 'Uso da franquia',
    },
    argTypes: {
        values: {control: 'object', description: 'Valores de 0 a 1 por seção (soma limitada a 1)'},
        colors: {control: 'object', description: 'Cores CSS por seção (padrão: paleta do skin)'},
    },
} satisfies Meta<typeof Meter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {};

export const UmaSecao: Story = {
    name: 'Uma seção',
    args: {values: [0.65], 'aria-label': 'Consumo de dados'},
};

export const CoresPersonalizadas: Story = {
    name: 'Cores personalizadas',
    args: {
        values: [0.4, 0.25, 0.15],
        colors: ['var(--mistica-success)', 'var(--mistica-warning)', 'var(--mistica-error)'],
    },
};

export const ComLegenda: Story = {
    name: 'Com legenda',
    render: (args) => (
        <div className="grid w-80 gap-2">
            <Text preset="text2" weight="medium">
                Franquia de 20 GB
            </Text>
            <Meter {...args} />
            <Text preset="text1" color="secondary">
                7 GB em apps, 4 GB em vídeo, 2 GB em navegação
            </Text>
        </div>
    ),
};
