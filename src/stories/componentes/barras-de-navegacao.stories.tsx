import type {Meta, StoryObj} from '@storybook/react-webpack5';
import * as React from 'react';
import {Bell, HelpCircle, Search, X} from 'lucide-react';
import {fn} from 'storybook/test';

import {
    Avatar,
    FunnelNavigationBar,
    IconButton,
    MainNavigationBar,
    NavigationBar,
    Text,
} from '@/components/mistica';

/**
 * Barras de navegação do Mistica: `NavigationBar` (voltar + título + ações),
 * `MainNavigationBar` (logo + seções + ações) e `FunnelNavigationBar`
 * (logo + ações, para funis de compra). No skin vivo o fundo é roxo por
 * design (token navigationBarBackground), como no app da Vivo.
 */
const meta = {
    title: 'Componentes/Barras de navegação',
    component: NavigationBar,
    args: {
        title: 'Detalhes da fatura',
        onBack: fn(),
        withoutDivider: false,
    },
    argTypes: {
        title: {control: 'text'},
        withoutDivider: {control: 'boolean', description: 'Remove a borda inferior'},
    },
} satisfies Meta<typeof NavigationBar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Ações dentro das barras herdam a cor do texto da barra (text-current). */
const classesAcaoNaBarra = 'text-current hover:bg-white/15 active:bg-white/25 focus-visible:ring-current';

export const Padrao: Story = {
    name: 'NavigationBar',
};

export const ComAcoes: Story = {
    name: 'NavigationBar com ações',
    render: (args) => (
        <NavigationBar
            {...args}
            actions={
                <>
                    <IconButton Icon={Search} aria-label="Buscar" small className={classesAcaoNaBarra} />
                    <IconButton Icon={Bell} aria-label="Notificações" small className={classesAcaoNaBarra} />
                </>
            }
        />
    ),
};

export const SemVoltar: Story = {
    name: 'NavigationBar sem voltar',
    args: {title: 'Minha Vivo'},
    render: (args) => <NavigationBar title={args.title} withoutDivider={args.withoutDivider} />,
};

export const Principal: Story = {
    name: 'MainNavigationBar',
    render: () => {
        const [secao, setSecao] = React.useState(0);
        return (
            <MainNavigationBar
                logo={
                    <Text preset="text3" weight="medium">
                        vivo
                    </Text>
                }
                sections={['Início', 'Produtos', 'Faturas', 'Ajuda'].map((title, index) => ({
                    title,
                    onPress: () => setSecao(index),
                }))}
                selectedIndex={secao}
                actions={
                    <>
                        <IconButton
                            Icon={Bell}
                            aria-label="Notificações"
                            small
                            className={classesAcaoNaBarra}
                        />
                        <Avatar initials="MR" size={32} />
                    </>
                }
            />
        );
    },
};

export const Funil: Story = {
    name: 'FunnelNavigationBar',
    render: () => (
        <FunnelNavigationBar
            logo={
                <Text preset="text3" weight="medium">
                    vivo
                </Text>
            }
            actions={
                <>
                    <IconButton Icon={HelpCircle} aria-label="Ajuda" small className={classesAcaoNaBarra} />
                    <IconButton Icon={X} aria-label="Fechar" small className={classesAcaoNaBarra} />
                </>
            }
        />
    ),
};
