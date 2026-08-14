import type {Meta, StoryObj} from '@storybook/react-webpack5';
import {fn} from 'storybook/test';

import {
    ButtonDanger,
    ButtonLink,
    ButtonLinkDanger,
    ButtonPrimary,
    ButtonSecondary,
} from '@/components/mistica';

/**
 * Botões do Mistica: `ButtonPrimary`, `ButtonSecondary`, `ButtonDanger`,
 * `ButtonLink` e `ButtonLinkDanger` — mesma API do `@telefonica/mistica`
 * (`onPress`, `small`, `showSpinner`, `loadingText`, `submit`, `href`).
 */
const meta = {
    title: 'Componentes/Botões/Button',
    component: ButtonPrimary,
    args: {
        children: 'Ação principal',
        onPress: fn(),
        small: false,
        showSpinner: false,
        disabled: false,
    },
    argTypes: {
        children: {control: 'text', description: 'Conteúdo do botão'},
        small: {control: 'boolean', description: 'Altura reduzida'},
        showSpinner: {control: 'boolean', description: 'Mostra o spinner e desabilita'},
        loadingText: {control: 'text', description: 'Texto exibido junto ao spinner'},
        disabled: {control: 'boolean'},
        href: {control: 'text', description: 'Renderiza como link'},
    },
} satisfies Meta<typeof ButtonPrimary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primario: Story = {
    name: 'ButtonPrimary',
};

export const Secundario: Story = {
    name: 'ButtonSecondary',
    render: (args) => <ButtonSecondary {...args} />,
};

export const Perigo: Story = {
    name: 'ButtonDanger',
    args: {children: 'Cancelar linha'},
    render: (args) => <ButtonDanger {...args} />,
};

export const Link: Story = {
    name: 'ButtonLink',
    args: {children: 'Saiba mais'},
    render: (args) => <ButtonLink {...args} />,
};

export const LinkPerigo: Story = {
    name: 'ButtonLinkDanger',
    args: {children: 'Excluir conta'},
    render: (args) => <ButtonLinkDanger {...args} />,
};

export const Carregando: Story = {
    args: {showSpinner: true, loadingText: 'Enviando...'},
};

export const Pequeno: Story = {
    args: {small: true},
};

export const ComoLink: Story = {
    name: 'Com href',
    args: {href: 'https://www.vivo.com.br', newTab: true, children: 'Abrir vivo.com.br'},
};
