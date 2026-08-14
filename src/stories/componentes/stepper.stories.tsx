import type {Meta, StoryObj} from '@storybook/react-webpack5';
import * as React from 'react';

import {ButtonPrimary, ButtonSecondary, Stepper} from '@/components/mistica';

/**
 * Stepper do Mistica: passos de um fluxo com transições animadas —
 * concluído (círculo com check), atual (borda ativa e número) e futuro.
 * API: `steps` (rótulos) + `currentIndex` (0-based).
 */
const meta = {
    title: 'Componentes/Stepper',
    component: Stepper,
    args: {
        steps: ['Dados', 'Endereço', 'Pagamento', 'Confirmação'],
        currentIndex: 2,
    },
    argTypes: {
        currentIndex: {
            control: {type: 'number', min: 0, max: 4},
            description: 'Índice do passo atual (0-based)',
        },
        steps: {description: 'Rótulos dos passos'},
    },
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
    name: 'Padrão',
};

export const PrimeiroPasso: Story = {
    name: 'Primeiro passo',
    args: {currentIndex: 0},
};

export const Concluido: Story = {
    name: 'Concluído',
    args: {currentIndex: 4},
};

export const Interativo: Story = {
    render: (args) => {
        const [passo, setPasso] = React.useState(0);
        const total = args.steps.length;
        return (
            <div className="grid gap-6">
                <Stepper steps={args.steps} currentIndex={passo} />
                <div className="flex gap-3">
                    <ButtonSecondary
                        small
                        disabled={passo === 0}
                        onPress={() => setPasso((p) => Math.max(0, p - 1))}
                    >
                        Voltar
                    </ButtonSecondary>
                    <ButtonPrimary
                        small
                        disabled={passo === total}
                        onPress={() => setPasso((p) => Math.min(total, p + 1))}
                    >
                        Avançar
                    </ButtonPrimary>
                </div>
            </div>
        );
    },
};
