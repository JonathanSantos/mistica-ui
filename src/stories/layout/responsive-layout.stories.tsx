import type {Meta, StoryObj} from '@storybook/react-vite';

import {Placeholder, ResponsiveLayout, Stack} from '@/components/mistica';

/**
 * `ResponsiveLayout`: contêiner central do Mistica — largura máxima de
 * 1224px e margens laterais do token `responsiveLayoutMargin` (16px no
 * mobile / 48px no desktop). O fundo cinza nas stories mostra a área que o
 * contêiner não ocupa.
 */
const meta = {
    title: 'Layout/ResponsiveLayout',
    component: ResponsiveLayout,
    args: {
        fullWidth: false,
        children: (
            <Stack space={16}>
                <Placeholder height={96} />
                <Placeholder height={48} />
            </Stack>
        ),
    },
    argTypes: {
        fullWidth: {control: 'boolean', description: 'Remove a largura máxima (mantém as margens)'},
        children: {control: false},
    },
    render: (args) => (
        <div className="rounded-mistica-media-small bg-mistica-background-alternative py-6">
            <ResponsiveLayout {...args} />
        </div>
    ),
} satisfies Meta<typeof ResponsiveLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
    name: 'Padrão (máx. 1224px)',
};

export const LarguraTotal: Story = {
    name: 'fullWidth',
    args: {fullWidth: true},
};
