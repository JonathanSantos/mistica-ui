import type {Meta, StoryObj} from '@storybook/react-vite';

import {Align, Placeholder} from '@/components/mistica';

/**
 * `Align`: posiciona o filho nos eixos horizontal e vertical do espaço
 * disponível. Para alinhamento vertical é preciso `fullHeight` e um pai com
 * altura definida — a moldura tracejada nas stories marca esse espaço.
 */
const meta = {
    title: 'Layout/Align',
    component: Align,
    args: {
        horizontal: 'left',
        vertical: 'top',
        fullHeight: true,
        children: <Placeholder height={48} width={160} />,
    },
    argTypes: {
        horizontal: {
            control: 'select',
            options: ['left', 'center', 'right'],
            description: 'Posição no eixo horizontal',
        },
        vertical: {
            control: 'select',
            options: ['top', 'center', 'bottom'],
            description: 'Posição no eixo vertical',
        },
        fullHeight: {control: 'boolean', description: 'Ocupa a altura toda do pai'},
        children: {control: false},
    },
    render: (args) => (
        <div className="h-56 rounded-mistica-media-small border border-dashed border-mistica-border p-2">
            <Align {...args} />
        </div>
    ),
} satisfies Meta<typeof Align>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
    name: 'Padrão (left/top)',
};

export const Centralizado: Story = {
    name: 'Centralizado',
    args: {horizontal: 'center', vertical: 'center'},
};

export const CantoInferiorDireito: Story = {
    name: 'Canto inferior direito',
    args: {horizontal: 'right', vertical: 'bottom'},
};
