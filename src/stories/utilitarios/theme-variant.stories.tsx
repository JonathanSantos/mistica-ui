import type {Meta, StoryObj} from '@storybook/react-webpack5';
import {fn} from 'storybook/test';

import {ButtonLink, ButtonPrimary, ButtonSecondary, Text, ThemeVariant} from '@/components/mistica';

/**
 * `ThemeVariant`: dentro de `variant="inverse"`, botões, links e textos
 * passam a usar os tokens inversos — para conteúdo sobre fundos de marca
 * (Hero, CoverHero, headers), como no Mistica original.
 */
const meta = {
    title: 'Utilitários/ThemeVariant',
    component: ThemeVariant,
    args: {
        variant: 'inverse',
        children: (
            <div className="flex flex-wrap items-center gap-3">
                <ButtonPrimary onPress={fn()}>Contratar agora</ButtonPrimary>
                <ButtonSecondary onPress={fn()}>Ver planos</ButtonSecondary>
                <ButtonLink onPress={fn()}>Saiba mais</ButtonLink>
            </div>
        ),
    },
    argTypes: {
        variant: {
            control: 'select',
            options: ['inverse', 'default'],
            description: 'Conjunto de tokens aplicado aos filhos',
        },
        children: {control: false},
    },
    render: (args) => (
        <div className="rounded-mistica-container bg-mistica-background-brand p-6">
            <ThemeVariant {...args} />
        </div>
    ),
} satisfies Meta<typeof ThemeVariant>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Inverso: Story = {
    name: 'Inverse sobre fundo de marca',
};

export const ComTexto: Story = {
    name: 'Com texto',
    args: {
        children: (
            <div className="grid gap-3">
                <Text preset="text6">Vivo Fibra</Text>
                <Text preset="text2" color="secondary">
                    Internet que acompanha o seu ritmo — até 1 Giga com Wi-Fi 6 incluso.
                </Text>
                <div className="flex flex-wrap gap-3">
                    <ButtonPrimary onPress={fn()}>Contratar</ButtonPrimary>
                    <ButtonLink onPress={fn()}>Consultar cobertura</ButtonLink>
                </div>
            </div>
        ),
    },
};

export const VariantePadrao: Story = {
    name: 'default (sem inversão)',
    args: {variant: 'default'},
    render: (args) => (
        <div className="rounded-mistica-container bg-mistica-background-container p-6">
            <ThemeVariant {...args} />
        </div>
    ),
};
