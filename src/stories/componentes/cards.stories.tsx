import type {Meta, StoryObj} from '@storybook/react-webpack5';
import {fn} from 'storybook/test';
import {CreditCard, Rocket, Smartphone, Tv, Wifi} from 'lucide-react';

import {
    ButtonLink,
    ButtonPrimary,
    ButtonSecondary,
    CoverCard,
    DataCard,
    DisplayDataCard,
    DisplayMediaCard,
    MediaCard,
    NakedCard,
    PosterCard,
    SnapCard,
    Tag,
    ThemeVariant,
} from '@/components/mistica';

/**
 * Cards do Mistica: `DataCard`, `MediaCard`, `SnapCard`, `PosterCard`,
 * `DisplayDataCard`, `DisplayMediaCard`, `NakedCard` e `CoverCard` — mesma
 * API do `@telefonica/mistica` (`headline`, `pretitle`, `title`, `subtitle`,
 * `description`, `icon`, `button`/`buttonLink` como ReactNode e `onPress`).
 */
const meta = {
    title: 'Componentes/Cards',
    component: DataCard,
    args: {
        icon: <Smartphone />,
        headline: <Tag type="promo">Novidade</Tag>,
        pretitle: 'Planos',
        title: 'Vivo Pós 50 GB',
        description: 'Ligações ilimitadas, 50 GB de internet e apps de streaming inclusos.',
        button: (
            <ButtonPrimary small onPress={fn()}>
                Contratar
            </ButtonPrimary>
        ),
        buttonLink: <ButtonLink onPress={fn()}>Saiba mais</ButtonLink>,
    },
    argTypes: {
        pretitle: {control: 'text'},
        title: {control: 'text'},
        subtitle: {control: 'text'},
        description: {control: 'text'},
        icon: {control: false, description: 'Elemento de ícone pronto (ReactNode)'},
        headline: {control: false, description: 'Ex.: <Tag type="promo">'},
        button: {control: false, description: 'ButtonPrimary/Secondary pronto'},
        buttonLink: {control: false, description: 'ButtonLink pronto'},
    },
} satisfies Meta<typeof DataCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Data: Story = {
    name: 'DataCard',
    render: (args) => (
        <div className="max-w-md">
            <DataCard {...args} />
        </div>
    ),
};

export const Media: Story = {
    name: 'MediaCard',
    render: () => (
        <div className="max-w-md">
            <MediaCard
                src="https://picsum.photos/seed/fibra/800/450"
                headline={<Tag type="success">Disponível</Tag>}
                title="Vivo Fibra 700 Mega"
                description="Wi-Fi 6 grátis na instalação para novos clientes."
                button={
                    <ButtonSecondary small onPress={fn()}>
                        Verificar cobertura
                    </ButtonSecondary>
                }
                buttonLink={<ButtonLink onPress={fn()}>Ver planos</ButtonLink>}
            />
        </div>
    ),
};

export const Snap: Story = {
    name: 'SnapCard',
    render: () => (
        <div className="grid max-w-2xl grid-cols-2 gap-4 lg:grid-cols-4">
            <SnapCard icon={<Wifi />} title="Wi-Fi" subtitle="Gerenciar rede" onPress={fn()} />
            <SnapCard icon={<CreditCard />} title="Fatura" subtitle="Vence dia 10" onPress={fn()} />
            <SnapCard icon={<Tv />} title="Vivo Play" subtitle="Canais e filmes" onPress={fn()} />
            <SnapCard icon={<Rocket />} title="Turbo" subtitle="Pacotes extras" onPress={fn()} />
        </div>
    ),
};

export const Poster: Story = {
    name: 'PosterCard',
    render: () => (
        <div className="max-w-xs">
            <PosterCard
                src="https://picsum.photos/seed/oferta/700/1000"
                headline={<Tag type="promo">Oferta</Tag>}
                pretitle="Só no app"
                title="Dobro de internet"
                description="Ative em um toque e aproveite."
                onPress={fn()}
            />
        </div>
    ),
};

export const Display: Story = {
    name: 'DisplayDataCard e DisplayMediaCard',
    render: () => (
        <div className="grid max-w-3xl gap-4 lg:grid-cols-2">
            <DisplayDataCard
                icon={<Rocket />}
                pretitle="Internet"
                title="Turbine seu plano"
                description="Pacotes extras a partir de R$ 9,90."
                button={
                    <ButtonSecondary small onPress={fn()}>
                        Ver pacotes
                    </ButtonSecondary>
                }
            />
            <DisplayMediaCard
                src="https://picsum.photos/seed/cinema/700/1000"
                headline={<Tag type="info">Vivo Play</Tag>}
                title="Cinema em casa"
                description="Filmes e séries inclusos no seu plano."
                button={
                    <ThemeVariant variant="inverse">
                        <ButtonPrimary small onPress={fn()}>
                            Assistir agora
                        </ButtonPrimary>
                    </ThemeVariant>
                }
            />
        </div>
    ),
};

export const NakedECover: Story = {
    name: 'NakedCard e CoverCard',
    render: () => (
        <div className="grid max-w-3xl gap-4 lg:grid-cols-2">
            <NakedCard
                src="https://picsum.photos/seed/wifi/800/450"
                pretitle="Blog Vivo"
                title="5 dicas para melhorar seu Wi-Fi"
                description="Pequenos ajustes que fazem diferença na cobertura da sua casa."
                onPress={fn()}
            />
            <CoverCard
                src="https://picsum.photos/seed/valoriza/800/450"
                headline={<Tag type="promo">Vivo Valoriza</Tag>}
                title="Vantagens para quem é cliente"
                description="Descontos em cinema, música e muito mais."
                onPress={fn()}
            />
        </div>
    ),
};
