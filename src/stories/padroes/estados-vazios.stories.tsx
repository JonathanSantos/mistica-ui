import type {Meta, StoryObj} from '@storybook/react-vite';
import {fn} from 'storybook/test';
import {Inbox, WifiOff} from 'lucide-react';

import {
    ButtonLink,
    ButtonSecondary,
    Circle,
    EmptyState,
    EmptyStateCard,
} from '@/components/mistica';

/**
 * EmptyState do Mistica: ícone/imagem + título + descrição + ações, centrado.
 * `EmptyStateCard` é a variação dentro de um container boxed. O visual à
 * esquerda vem de `asset` (elemento pronto) ou `imageUrl`.
 */
const meta = {
    title: 'Padrões/Estados vazios',
    component: EmptyState,
    args: {
        title: 'Nenhuma fatura por aqui',
        description: 'Quando a próxima fatura fechar, ela aparece nesta lista.',
        button: (
            <ButtonSecondary small onPress={fn()}>
                Ver faturas antigas
            </ButtonSecondary>
        ),
    },
    argTypes: {
        title: {control: 'text'},
        description: {control: 'text'},
        imageUrl: {control: 'text', description: 'Imagem usada quando não há asset'},
    },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
    name: 'Padrão',
    args: {
        asset: (
            <Circle size={64}>
                <Inbox className="size-8" />
            </Circle>
        ),
    },
};

export const ComImagem: Story = {
    name: 'Com imagem',
    args: {
        imageUrl: 'https://picsum.photos/seed/vivo-vazio/400/400',
    },
};

export const EmCard: Story = {
    name: 'EmptyStateCard',
    args: {
        asset: (
            <Circle size={64}>
                <WifiOff className="size-8" />
            </Circle>
        ),
        title: 'Você está sem conexão',
        description: 'Verifique o Wi-Fi ou os dados móveis e tente de novo.',
        button: (
            <ButtonSecondary small onPress={fn()}>
                Tentar de novo
            </ButtonSecondary>
        ),
        buttonLink: <ButtonLink onPress={fn()}>Usar modo offline</ButtonLink>,
    },
    render: (args) => <EmptyStateCard {...args} />,
};
