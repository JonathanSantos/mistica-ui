import type {Meta, StoryObj} from '@storybook/react-vite';
import {fn} from 'storybook/test';

import {
    Box,
    ButtonFixedFooterLayout,
    ButtonLink,
    ButtonPrimary,
    Placeholder,
    Stack,
} from '@/components/mistica';

/**
 * `ButtonFixedFooterLayout`: conteúdo com rodapé de botões preso embaixo
 * (sticky), com fundo de container e borda superior — o padrão de fluxos
 * mobile do Mistica (confirmar compra, mudança de plano...). A moldura com
 * rolagem nas stories simula uma tela de altura fixa.
 */
const meta = {
    title: 'Layout/ButtonFixedFooterLayout',
    component: ButtonFixedFooterLayout,
    args: {
        button: (
            <ButtonPrimary onPress={fn()} className="w-full sm:w-auto">
                Confirmar mudança
            </ButtonPrimary>
        ),
        secondaryButton: (
            <ButtonLink onPress={fn()} className="w-full sm:w-auto">
                Cancelar
            </ButtonLink>
        ),
        children: (
            <Box padding={16}>
                <Stack space={12}>
                    <Placeholder height={64} />
                    <Placeholder height={64} />
                    <Placeholder height={64} />
                    <Placeholder height={64} />
                    <Placeholder height={64} />
                </Stack>
            </Box>
        ),
    },
    argTypes: {
        button: {control: false, description: 'Botão principal (ReactNode)'},
        secondaryButton: {control: false, description: 'Botão secundário opcional'},
        children: {control: false},
    },
    render: (args) => (
        <div className="h-80 overflow-y-auto rounded-mistica-media-small border border-mistica-border">
            <ButtonFixedFooterLayout {...args} />
        </div>
    ),
} satisfies Meta<typeof ButtonFixedFooterLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
    name: 'Padrão',
};

export const SomenteBotaoPrincipal: Story = {
    name: 'Somente botão principal',
    args: {secondaryButton: undefined},
};
