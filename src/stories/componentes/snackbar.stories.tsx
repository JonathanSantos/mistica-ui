import * as React from 'react';
import type {Meta, StoryObj} from '@storybook/react-webpack5';
import {fn} from 'storybook/test';

import {ButtonSecondary, openSnackbar, Text} from '@/components/mistica';

type OpenSnackbarParams = Parameters<typeof openSnackbar>[0];

/**
 * Snackbar do Mistica: API imperativa `openSnackbar({message, type, buttonText,
 * duration, onClose})`, também disponível via `useSnackbar()` — mesma assinatura
 * do `@telefonica/mistica`. O `SnackbarProvider` já está montado globalmente,
 * então basta chamar `openSnackbar(...)` em qualquer `onPress`.
 */
const meta = {
    title: 'Componentes/Snackbar',
    args: {
        message: 'Plano atualizado com sucesso',
        type: 'INFORMATIVE',
        onClose: fn(),
    },
    argTypes: {
        message: {control: 'text', description: 'Texto do snackbar'},
        type: {
            control: 'select',
            options: ['INFORMATIVE', 'CRITICAL'],
            description: 'INFORMATIVE (fundo info) ou CRITICAL (fundo de erro)',
        },
        buttonText: {control: 'text', description: 'Texto do botão de ação'},
        duration: {
            control: 'select',
            options: [3000, 5000, 10000, 'PERSISTENT'],
            description: 'Duração em ms, ou PERSISTENT para não fechar sozinho',
        },
    },
    render: (args) => (
        <ButtonSecondary onPress={() => openSnackbar(args)}>Abrir snackbar</ButtonSecondary>
    ),
} satisfies Meta<OpenSnackbarParams>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Informativo: Story = {};

export const Critico: Story = {
    name: 'Crítico',
    args: {message: 'Não foi possível salvar as alterações', type: 'CRITICAL'},
};

export const ComBotao: Story = {
    name: 'Com botão',
    args: {message: 'Linha adicional removida', buttonText: 'Desfazer'},
};

export const Persistente: Story = {
    args: {
        message: 'Sua fatura de agosto está disponível',
        buttonText: 'Ver fatura',
        duration: 'PERSISTENT',
    },
};

export const ResultadoDoOnClose: Story = {
    name: 'onClose com result.action',
    args: {message: 'Chip virtual ativado', buttonText: 'OK'},
    render: (args) => {
        const [ultimaAcao, setUltimaAcao] = React.useState<string | null>(null);
        return (
            <div className="flex flex-wrap items-center gap-4">
                <ButtonSecondary
                    onPress={() =>
                        openSnackbar({...args, onClose: (result) => setUltimaAcao(result.action)})
                    }
                >
                    Abrir snackbar
                </ButtonSecondary>
                <Text preset="text2" color="secondary">
                    {ultimaAcao
                        ? `Fechado por: ${ultimaAcao}`
                        : 'Feche pelo botão ou espere o timeout para ver o result.action'}
                </Text>
            </div>
        );
    },
};
