import type {Meta, StoryObj} from '@storybook/react-vite';
import * as React from 'react';

import {ProgressBar, ProgressBarStepped, Text} from '@/components/mistica';

/**
 * Barras de progresso do Mistica: `ProgressBar` (contínua, 0 a 100) e
 * `ProgressBarStepped` (segmentada por passos concluídos). Ambas aceitam
 * `error` para pintar o preenchimento com a cor de erro.
 */
const meta = {
    title: 'Componentes/Barras de progresso',
    component: ProgressBar,
    args: {
        value: 60,
        error: false,
    },
    argTypes: {
        value: {control: {type: 'number', min: 0, max: 100}, description: 'Progresso de 0 a 100'},
        error: {control: 'boolean', description: 'Preenchimento com a cor de erro'},
    },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
    name: 'ProgressBar',
};

export const ComErro: Story = {
    name: 'Com erro',
    args: {value: 80, error: true},
};

export const Segmentada: Story = {
    name: 'ProgressBarStepped',
    render: (args) => (
        <div className="grid gap-2">
            <ProgressBarStepped steps={5} currentStep={3} error={args.error} />
            <Text preset="text1" color="secondary">
                Passo 3 de 5 da contratação
            </Text>
        </div>
    ),
};

export const Animada: Story = {
    name: 'Progresso animado',
    render: (args) => <ProgressoAnimado error={args.error} />,
};

function ProgressoAnimado({error}: {error?: boolean}) {
    const [value, setValue] = React.useState(0);

    React.useEffect(() => {
        const id = setInterval(() => {
            setValue((v) => (v >= 100 ? 0 : v + 10));
        }, 800);
        return () => clearInterval(id);
    }, []);

    return (
        <div className="grid gap-2">
            <ProgressBar value={value} error={error} />
            <Text preset="text1" color="secondary">
                Baixando fatura... {value}%
            </Text>
        </div>
    );
}
