import type {Meta, StoryObj} from '@storybook/react-vite';
import {fn} from 'storybook/test';
import {Gift, Info} from 'lucide-react';

import {ButtonLink, ButtonSecondary, Callout} from '@/components/mistica';

/**
 * Callout do Mistica: destaque inline com fundo alternativo, ícone opcional
 * (`asset`), título/descrição, ações (`button`, `secondaryButton`,
 * `buttonLink`) e botão de fechar quando `onClose` é passado.
 */
const meta = {
    title: 'Componentes/Callout',
    component: Callout,
    args: {
        title: 'Fatura digital ativada',
        description:
            'Sua próxima fatura chegará por e-mail. Você pode voltar para o boleto quando quiser.',
    },
    argTypes: {
        title: {control: 'text', description: 'Título opcional'},
        description: {control: 'text', description: 'Texto principal (obrigatório)'},
    },
} satisfies Meta<typeof Callout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
    name: 'Padrão',
};

export const ComAsset: Story = {
    name: 'Com asset',
    args: {
        asset: <Info className="mt-0.5 size-6 text-mistica-neutral-high" />,
    },
};

export const ComAcoes: Story = {
    name: 'Com ações',
    args: {
        asset: <Gift className="mt-0.5 size-6 text-mistica-neutral-high" />,
        title: 'Você tem 5 GB de bônus',
        description: 'Ative até 31/08 para usar o bônus ainda neste ciclo de cobrança.',
        button: (
            <ButtonSecondary small onPress={fn()}>
                Ativar bônus
            </ButtonSecondary>
        ),
        buttonLink: (
            <ButtonLink small onPress={fn()}>
                Saiba mais
            </ButtonLink>
        ),
    },
};

export const Fechavel: Story = {
    name: 'Fechável',
    args: {
        asset: <Info className="mt-0.5 size-6 text-mistica-neutral-high" />,
        onClose: fn(),
    },
};
