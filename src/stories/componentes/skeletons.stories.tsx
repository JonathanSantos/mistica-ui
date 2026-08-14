import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {Skeleton, SkeletonText} from '@/components/mistica';

/**
 * Skeletons do Mistica: `Skeleton` com variantes `line`, `circle` e
 * `rectangle` (token backgroundSkeleton + pulso) e `SkeletonText` para
 * blocos de várias linhas com a última mais curta.
 */
const meta = {
    title: 'Componentes/Skeletons',
    component: Skeleton,
    args: {
        variant: 'line',
    },
    argTypes: {
        variant: {
            control: 'select',
            options: ['line', 'circle', 'rectangle'],
            description: 'Forma do skeleton',
        },
    },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Linha: Story = {
    name: 'Line',
};

export const Circulo: Story = {
    name: 'Circle',
    args: {variant: 'circle'},
};

export const Retangulo: Story = {
    name: 'Rectangle',
    args: {variant: 'rectangle'},
};

export const Texto: Story = {
    name: 'SkeletonText',
    render: () => <SkeletonText lines={4} />,
};

export const CardCarregando: Story = {
    name: 'Composição: card carregando',
    render: () => (
        <div className="flex w-80 items-start gap-4 rounded-mistica-media-small border border-mistica-border p-4">
            <Skeleton variant="circle" />
            <div className="flex-1">
                <SkeletonText lines={3} />
            </div>
        </div>
    ),
};
