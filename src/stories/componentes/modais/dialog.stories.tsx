import type {Meta, StoryObj} from '@storybook/react-vite';
import {fn} from 'storybook/test';

import {alert, ButtonSecondary, confirm, dialog} from '@/components/mistica';

type DialogParams = Parameters<typeof alert>[0];

/**
 * Diálogos imperativos do Mistica: `alert()` (só aceitar), `confirm()`
 * (aceitar + cancelar) e `dialog()` (confirm com layout padrão), com `title`,
 * `message`, `acceptText`, `cancelText`, `onAccept`, `onCancel` e
 * `destructiveAction`. O `DialogRoot` já está montado globalmente, então basta
 * chamar as funções em qualquer `onPress`.
 */
const meta = {
    title: 'Componentes/Modais/Dialog',
    args: {
        title: 'Sem conexão',
        message: 'Verifique sua internet e tente de novo.',
        acceptText: 'Entendi',
        onAccept: fn(),
        onCancel: fn(),
    },
    argTypes: {
        title: {control: 'text'},
        message: {control: 'text'},
        acceptText: {control: 'text', description: 'Texto do botão de aceitar'},
        cancelText: {control: 'text', description: 'Texto do botão de cancelar (só no confirm)'},
        destructiveAction: {control: 'boolean', description: 'Botão de aceitar em vermelho'},
    },
    render: (args) => (
        <ButtonSecondary onPress={() => alert(args)}>Abrir alert()</ButtonSecondary>
    ),
} satisfies Meta<DialogParams>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Alerta: Story = {
    name: 'alert()',
};

export const Confirmacao: Story = {
    name: 'confirm()',
    args: {
        title: 'Trocar de plano?',
        message: 'O novo plano passa a valer agora e a diferença é ajustada na próxima fatura.',
        acceptText: 'Trocar plano',
        cancelText: 'Voltar',
    },
    render: (args) => (
        <ButtonSecondary onPress={() => confirm(args)}>Abrir confirm()</ButtonSecondary>
    ),
};

export const ConfirmacaoDestrutiva: Story = {
    name: 'confirm() destrutivo',
    args: {
        title: 'Cancelar assinatura?',
        message: 'Você perderá o acesso aos canais inclusos no plano ao final do período já pago.',
        acceptText: 'Cancelar assinatura',
        cancelText: 'Voltar',
        destructiveAction: true,
    },
    render: (args) => (
        <ButtonSecondary onPress={() => confirm(args)}>Abrir confirm()</ButtonSecondary>
    ),
};

export const DialogGenerico: Story = {
    name: 'dialog()',
    args: {
        title: 'Renovação antecipada',
        message: 'Renove agora e ganhe 5 GB de bônus por 3 meses.',
        acceptText: 'Renovar agora',
        cancelText: 'Agora não',
    },
    render: (args) => (
        <ButtonSecondary onPress={() => dialog(args)}>Abrir dialog()</ButtonSecondary>
    ),
};
