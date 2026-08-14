import type {Meta, StoryObj} from '@storybook/react-vite';
import {fn} from 'storybook/test';

import {
    Breadcrumbs,
    ButtonPrimary,
    Header,
    HeaderLayout,
    MainSectionHeader,
} from '@/components/mistica';

/**
 * Cabeçalhos do Mistica: `Header` (pretitle/title/description em texto
 * inverso), `HeaderLayout` (faixa com fundo brand, breadcrumbs e extra) e
 * `MainSectionHeader` (cabeçalho de seção com ação à direita).
 */
const meta = {
    title: 'Componentes/Headers',
    component: Header,
    args: {
        pretitle: 'Conta 1234-5',
        title: 'Suas faturas',
        description: 'Acompanhe cobranças, baixe segundas vias e negocie débitos.',
    },
    argTypes: {
        pretitle: {control: 'text'},
        title: {control: 'text'},
        description: {control: 'text'},
    },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
    name: 'Header em HeaderLayout',
    render: (args) => <HeaderLayout header={<Header {...args} />} />,
};

export const ComBreadcrumbs: Story = {
    name: 'Com breadcrumbs',
    render: (args) => (
        <HeaderLayout
            breadcrumbs={<Breadcrumbs items={[{title: 'Início', href: '#'}, {title: 'Faturas'}]} />}
            header={<Header {...args} />}
        />
    ),
};

export const SecaoPrincipal: Story = {
    name: 'MainSectionHeader',
    render: () => (
        <MainSectionHeader
            title="Faturas em aberto"
            description="2 faturas aguardando pagamento"
            action={
                <ButtonPrimary small onPress={fn()}>
                    Pagar todas
                </ButtonPrimary>
            }
        />
    ),
};
