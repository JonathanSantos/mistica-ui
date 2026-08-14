import type {Meta, StoryObj} from '@storybook/react-vite';
import {fn} from 'storybook/test';

import {ButtonLink, Carousel, MediaCard} from '@/components/mistica';

const apps = ['Streaming', 'Música', 'Games', 'Educação', 'Saúde', 'Viagens'];

const cartoes = apps.map((titulo) => (
    <MediaCard
        key={titulo}
        src={`https://picsum.photos/seed/${titulo}/800/450`}
        title={titulo}
        description="Apps inclusos no seu plano."
        buttonLink={<ButtonLink onPress={fn()}>Ver apps</ButtonLink>}
    />
));

/**
 * `Carousel` do Mistica: scroll horizontal com snap, setas no desktop e
 * bullets de página (bullet ativo alongado). Exibe 1 item por página no
 * mobile e `itemsPerPage` no desktop.
 */
const meta = {
    title: 'Componentes/Carousels',
    component: Carousel,
    args: {
        children: cartoes,
        itemsPerPage: 3,
        withBullets: true,
    },
    argTypes: {
        itemsPerPage: {control: {type: 'number', min: 1, max: 6}, description: 'Itens por página no desktop'},
        withBullets: {control: 'boolean', description: 'Mostra os bullets de página'},
        children: {control: false},
    },
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
    name: 'Padrão',
};

export const UmPorPagina: Story = {
    name: 'Um item por página',
    args: {itemsPerPage: 1},
};

export const SemBullets: Story = {
    name: 'Sem bullets',
    args: {withBullets: false},
};
