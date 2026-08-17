import type {Meta, StoryObj} from '@storybook/react-webpack5';
import {fn} from 'storybook/test';

import {
    Box,
    Boxed,
    ButtonPrimary,
    Divider,
    GridLayout,
    Inline,
    Placeholder,
    ResponsiveLayout,
    Stack,
    Text2,
    TextField,
    Title2,
    Title3,
} from '@/components/mistica';

/**
 * `GridLayout` do Mistica: grid de 12 colunas com templates prontos
 * (`6+6`, `8+4`, `4+6`, `5+4`, `3+9`, `10`, `8`) que definem os spans e as
 * colunas espaçadoras — mesma API do `@telefonica/mistica` (`template`,
 * `left`/`right` ou `children`, `verticalSpace`, `collapseBreakpoint`).
 * Abaixo do breakpoint de colapso vira coluna única com `verticalSpace`
 * de espaço entre as áreas.
 */
const meta = {
    title: 'Componentes/GridLayout',
    component: GridLayout,
    args: {
        template: '6+6',
        left: <Placeholder height={160} />,
        right: <Placeholder height={160} />,
        verticalSpace: 16,
    },
    argTypes: {
        template: {control: false, description: "'6+6' | '8+4' | '4+6' | '5+4' | '3+9' | '10' | '8'"},
        verticalSpace: {
            control: 'select',
            options: [0, 2, 4, 8, 12, 16, 24, 32, 40, 48, 56, 64, 72, 80],
            description: 'Espaço vertical (px) entre as áreas quando colapsado',
        },
        collapseBreakpoint: {
            control: 'inline-radio',
            options: ['tablet', 'mobile'],
            description: "Colapsa em coluna única a partir de: 'tablet' (padrão) ou só no 'mobile'",
        },
        left: {control: false},
        right: {control: false},
        children: {control: false},
        dataAttributes: {control: false},
    },
} satisfies Meta<typeof GridLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SeisMaisSeis: Story = {
    name: 'Template 6+6',
};

const pedido = [
    {item: 'Vivo Fibra 700 Mega', preco: 'R$ 119,90/mês'},
    {item: 'Wi-Fi 6 incluso', preco: 'R$ 0,00'},
] as const;

export const Checkout: Story = {
    name: 'Template 8+4 (checkout)',
    render: () => (
        <ResponsiveLayout>
            <GridLayout
                template="8+4"
                verticalSpace={24}
                left={
                    <Stack space={24}>
                        <Title2 as="h1">Dados da contratação</Title2>
                        <Stack space={16}>
                            <TextField label="Nome completo" name="nome" />
                            <TextField label="CPF" name="cpf" />
                            <TextField label="Endereço de instalação" name="endereco" />
                        </Stack>
                    </Stack>
                }
                right={
                    <Boxed>
                        <Box padding={24}>
                            <Stack space={16}>
                                <Title3 as="h2">Resumo do pedido</Title3>
                                <Stack space={8}>
                                    {pedido.map(({item, preco}) => (
                                        <Inline key={item} space="between">
                                            <Text2 color="secondary">{item}</Text2>
                                            <Text2 medium>{preco}</Text2>
                                        </Inline>
                                    ))}
                                </Stack>
                                <Divider />
                                <Inline space="between">
                                    <Text2 medium>Total mensal</Text2>
                                    <Text2 medium>R$ 119,90</Text2>
                                </Inline>
                                <ButtonPrimary onPress={fn()}>Finalizar compra</ButtonPrimary>
                            </Stack>
                        </Box>
                    </Boxed>
                }
            />
        </ResponsiveLayout>
    ),
};
