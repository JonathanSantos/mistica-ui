import * as React from 'react';
import type {Meta, StoryObj} from '@storybook/react-vite';

import {ButtonSecondary, FadeIn, Placeholder, Stack} from '@/components/mistica';

/**
 * `FadeIn`: entrada suave do conteúdo ao montar, com atraso (`delay`) e
 * duração (`duration`) opcionais em ms. A animação roda na montagem — use a
 * story "Reproduzir novamente" para vê-la de novo sem recarregar.
 */
const meta = {
    title: 'Utilitários/FadeIn',
    component: FadeIn,
    args: {
        delay: 0,
        duration: 300,
        children: <Placeholder height={120} />,
    },
    argTypes: {
        delay: {control: 'number', description: 'Atraso em ms'},
        duration: {control: 'number', description: 'Duração em ms'},
        children: {control: false},
    },
} satisfies Meta<typeof FadeIn>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
    name: 'Padrão',
};

export const Lento: Story = {
    name: 'Duração de 1s',
    args: {duration: 1000},
};

export const EmCascata: Story = {
    name: 'Em cascata',
    render: (args) => (
        <Stack space={12}>
            {[0, 150, 300, 450].map((atraso) => (
                <FadeIn key={atraso} {...args} delay={atraso}>
                    <Placeholder height={48} />
                </FadeIn>
            ))}
        </Stack>
    ),
};

export const ReproduzirNovamente: Story = {
    name: 'Reproduzir novamente',
    render: (args) => {
        const [execucao, setExecucao] = React.useState(0);
        return (
            <Stack space={16} align="start">
                <ButtonSecondary small onPress={() => setExecucao((n) => n + 1)}>
                    Reproduzir animação
                </ButtonSecondary>
                <FadeIn key={execucao} {...args} className="w-full">
                    <Placeholder height={120} />
                </FadeIn>
            </Stack>
        );
    },
};
