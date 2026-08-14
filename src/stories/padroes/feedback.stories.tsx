import type {Meta, StoryObj} from '@storybook/react-vite';
import {fn} from 'storybook/test';

import {
    ButtonLink,
    ButtonPrimary,
    ButtonSecondary,
    ErrorFeedbackScreen,
    InfoFeedbackScreen,
    SuccessFeedbackScreen,
} from '@/components/mistica';

/**
 * Telas de feedback do Mistica: `SuccessFeedbackScreen` (no skin vivo o
 * sucesso é "inverse": fundo brand com textos e botões invertidos),
 * `ErrorFeedbackScreen` e `InfoFeedbackScreen`, com `title`, `description`,
 * `primaryButton`, `secondaryButton` e `link`.
 */
const meta = {
    title: 'Padrões/Feedback',
    component: SuccessFeedbackScreen,
    args: {
        title: 'Tudo certo!',
        description: 'Seu novo plano já está ativo. A cobrança aparece na próxima fatura.',
        primaryButton: <ButtonPrimary onPress={fn()}>Continuar</ButtonPrimary>,
    },
    argTypes: {
        title: {control: 'text'},
        description: {control: 'text'},
    },
    render: (args) => (
        <div className="overflow-hidden rounded-mistica-container border border-mistica-border">
            <SuccessFeedbackScreen {...args} />
        </div>
    ),
} satisfies Meta<typeof SuccessFeedbackScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sucesso: Story = {
    name: 'SuccessFeedbackScreen',
};

export const Erro: Story = {
    name: 'ErrorFeedbackScreen',
    args: {
        title: 'Algo deu errado',
        description: 'Não conseguimos processar o pagamento. Tente novamente.',
        primaryButton: <ButtonPrimary onPress={fn()}>Tentar de novo</ButtonPrimary>,
        secondaryButton: <ButtonSecondary onPress={fn()}>Voltar</ButtonSecondary>,
    },
    render: (args) => (
        <div className="overflow-hidden rounded-mistica-container border border-mistica-border">
            <ErrorFeedbackScreen {...args} />
        </div>
    ),
};

export const Informacao: Story = {
    name: 'InfoFeedbackScreen',
    args: {
        title: 'Agendamento confirmado',
        description: 'O técnico chega entre 8h e 12h de quinta-feira, 21/08.',
        primaryButton: <ButtonPrimary onPress={fn()}>Entendi</ButtonPrimary>,
        link: <ButtonLink onPress={fn()}>Reagendar visita</ButtonLink>,
    },
    render: (args) => (
        <div className="overflow-hidden rounded-mistica-container border border-mistica-border">
            <InfoFeedbackScreen {...args} />
        </div>
    ),
};
