import type {Meta, StoryObj} from '@storybook/react-webpack5';
import {fn} from 'storybook/test';

import {
    ButtonPrimary,
    ButtonSecondary,
    CoverHero,
    Hero,
    Image,
    Tag,
    ThemeVariant,
} from '@/components/mistica';

/**
 * `Hero` do Mistica: bloco de destaque com texto + mídia em duas colunas no
 * desktop e fundos `default`, `alternative` ou `brand`. `CoverHero` é a
 * variante de largura total com imagem de fundo e overlay escuro.
 */
const meta = {
    title: 'Componentes/Hero',
    component: Hero,
    args: {
        pretitle: 'Vivo Fibra',
        title: 'Internet que acompanha o seu ritmo',
        description: 'Até 1 Giga de velocidade com Wi-Fi 6 incluso e instalação grátis.',
        background: 'default',
        actions: (
            <>
                <ButtonPrimary onPress={fn()}>Contratar agora</ButtonPrimary>
                <ButtonSecondary onPress={fn()}>Ver planos</ButtonSecondary>
            </>
        ),
        media: <Image src="https://picsum.photos/seed/fibra-hero/800/600" aspectRatio="4:3" />,
    },
    argTypes: {
        pretitle: {control: 'text'},
        title: {control: 'text'},
        description: {control: 'text'},
        background: {
            control: 'select',
            options: ['default', 'alternative', 'brand'],
            description: 'Cor de fundo do bloco',
        },
        actions: {control: false},
        media: {control: false},
    },
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
    name: 'Padrão',
};

export const FundoAlternativo: Story = {
    name: 'Fundo alternative',
    args: {background: 'alternative'},
};

export const FundoBrand: Story = {
    name: 'Fundo brand',
    args: {
        background: 'brand',
        actions: (
            <ThemeVariant variant="inverse" className="flex flex-wrap gap-3">
                <ButtonPrimary onPress={fn()}>Contratar agora</ButtonPrimary>
                <ButtonSecondary onPress={fn()}>Ver planos</ButtonSecondary>
            </ThemeVariant>
        ),
    },
};

export const Cover: Story = {
    name: 'CoverHero',
    render: () => (
        <CoverHero
            src="https://picsum.photos/seed/valoriza-hero/1200/600"
            headline={<Tag type="promo">Vivo Valoriza</Tag>}
            pretitle="Clube de vantagens"
            title="Vantagens para quem é cliente"
            description="Descontos em cinema, música e muito mais — todo mês."
            minHeight={360}
            actions={
                <ThemeVariant variant="inverse">
                    <ButtonPrimary onPress={fn()}>Conhecer benefícios</ButtonPrimary>
                </ThemeVariant>
            }
        />
    ),
};

export const CoverCentralizado: Story = {
    name: 'CoverHero centralizado',
    render: () => (
        <CoverHero
            src="https://picsum.photos/seed/5g-hero/1200/600"
            pretitle="Rede 5G"
            title="A maior cobertura 5G do Brasil"
            description="Ative o 5G no seu plano sem custo adicional."
            centered
            minHeight={400}
            actions={
                <ThemeVariant variant="inverse">
                    <ButtonPrimary onPress={fn()}>Ativar 5G</ButtonPrimary>
                </ThemeVariant>
            }
        />
    ),
};
