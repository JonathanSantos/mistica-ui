import type {Meta, StoryObj} from '@storybook/react-vite';
import {fn} from 'storybook/test';

import {Text, TextLink} from '@/components/mistica';

/**
 * `TextLink` do Mistica: link de texto inline na cor textLink com peso
 * medium. Renderiza `<a>` quando recebe `href` (com `newTab` seguro) ou
 * `<button>` quando só tem `onPress`. Sublinhado configurável via
 * `underline` (`hover`, `always`, `none`).
 */
const meta = {
    title: 'Componentes/TextLink',
    component: TextLink,
    args: {
        children: 'Ver detalhes da fatura',
        onPress: fn(),
        underline: 'hover',
        small: false,
    },
    argTypes: {
        children: {control: 'text', description: 'Conteúdo do link'},
        href: {control: 'text', description: 'Renderiza como <a>; sem href vira <button>'},
        newTab: {control: 'boolean', description: 'Abre em nova aba (rel seguro)'},
        underline: {
            control: 'select',
            options: ['hover', 'always', 'none'],
            description: 'Quando mostrar o sublinhado',
        },
        small: {control: 'boolean', description: 'Tamanho reduzido (text-sm)'},
    },
} satisfies Meta<typeof TextLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {};

export const ComHref: Story = {
    name: 'Com href',
    args: {
        children: 'Abrir vivo.com.br',
        href: 'https://www.vivo.com.br',
        newTab: true,
    },
};

export const SublinhadoSempre: Story = {
    name: 'Sublinhado sempre',
    args: {underline: 'always'},
};

export const EmParagrafo: Story = {
    name: 'Em parágrafo',
    render: (args) => (
        <Text preset="text2" className="max-w-96">
            Você usou 80% da franquia de dados deste mês.{' '}
            <TextLink {...args}>Contratar mais dados</TextLink> para continuar navegando sem
            redução de velocidade.
        </Text>
    ),
};
