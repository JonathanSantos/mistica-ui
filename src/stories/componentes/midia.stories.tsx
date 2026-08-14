import type {Meta, StoryObj} from '@storybook/react-webpack5';
import {Smartphone, Wifi} from 'lucide-react';

import {Circle, Image, Square, Video} from '@/components/mistica';

/**
 * Mídia do Mistica: `Image` e `Video` (aspect ratio e radius do skin, fundo
 * skeleton enquanto carrega) e as formas `Circle` e `Square` para ícones e
 * miniaturas.
 */
const meta = {
    title: 'Componentes/Mídia',
    component: Image,
    args: {
        src: 'https://picsum.photos/seed/vivo-midia/800/600',
        alt: 'Foto de exemplo',
        aspectRatio: '16:9',
        roundedContainer: false,
        noBorderRadius: false,
    },
    argTypes: {
        src: {control: 'text'},
        alt: {control: 'text'},
        aspectRatio: {
            control: 'select',
            options: ['1:1', '16:9', '4:3', '7:10', 'auto'],
            description: 'Proporção da mídia',
        },
        roundedContainer: {control: 'boolean', description: 'Radius de container (24px) em vez de mediaSmall'},
        noBorderRadius: {control: 'boolean', description: 'Remove o radius'},
    },
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
    name: 'Image',
    render: (args) => (
        <div className="max-w-md">
            <Image {...args} />
        </div>
    ),
};

export const RadiusDeContainer: Story = {
    name: 'Image com radius de container',
    args: {roundedContainer: true, aspectRatio: '4:3'},
    render: (args) => (
        <div className="max-w-md">
            <Image {...args} />
        </div>
    ),
};

export const VideoStory: Story = {
    name: 'Video',
    render: () => (
        <div className="max-w-md">
            <Video
                src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
                aspectRatio="16:9"
            />
        </div>
    ),
};

export const Formas: Story = {
    name: 'Circle e Square',
    render: () => (
        <div className="flex flex-wrap items-center gap-4">
            <Circle size={48}>
                <Wifi className="size-6" aria-hidden />
            </Circle>
            <Circle size={48} backgroundColor="var(--mistica-background-brand)">
                <Smartphone className="size-6 text-mistica-inverse" aria-hidden />
            </Circle>
            <Circle size={48} backgroundImage="https://picsum.photos/seed/perfil/200/200" />
            <Square size={48}>
                <Smartphone className="size-6" aria-hidden />
            </Square>
            <Square size={48} backgroundImage="https://picsum.photos/seed/loja/200/200" />
        </div>
    ),
};
