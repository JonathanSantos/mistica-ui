import * as React from 'react';
import type {Meta, StoryObj} from '@storybook/react-vite';

import {
    ButtonLink,
    ButtonPrimary,
    ButtonSecondary,
    Row,
    RowList,
    Sheet,
    SheetContent,
    SheetDescription,
    SheetTitle,
    Text,
} from '@/components/mistica';

/**
 * Sheet do Mistica: com `side="bottom"` é um bottom sheet com alça de arrastar
 * no mobile e modal centrado no desktop (>=1024px); `side="right"`/`side="left"`
 * são painéis laterais em qualquer tamanho. Composição Radix: `Sheet`,
 * `SheetTrigger`, `SheetContent`, `SheetTitle`, `SheetDescription`, `SheetClose`.
 */
const meta = {
    title: 'Componentes/Modais/Sheet',
    component: SheetContent,
    args: {side: 'bottom'},
    argTypes: {
        side: {
            control: 'select',
            options: ['bottom', 'right', 'left'],
            description: 'bottom = sheet/modal centrado; right/left = painel lateral',
        },
    },
    render: (args) => {
        const [aberto, setAberto] = React.useState(false);
        return (
            <>
                <ButtonSecondary onPress={() => setAberto(true)}>Abrir sheet</ButtonSecondary>
                <Sheet open={aberto} onOpenChange={setAberto}>
                    <SheetContent {...args}>
                        <SheetTitle asChild>
                            <Text as="h2" preset="drawer-title" weight="medium" className="mb-4">
                                Escolha um plano
                            </Text>
                        </SheetTitle>
                        <RowList>
                            <Row
                                title="Vivo Easy"
                                subtitle="10 GB + apps ilimitados"
                                onPress={() => setAberto(false)}
                            />
                            <Row
                                title="Vivo Controle"
                                subtitle="25 GB + WhatsApp grátis"
                                onPress={() => setAberto(false)}
                            />
                            <Row
                                title="Vivo Pós"
                                subtitle="50 GB para usar como quiser"
                                onPress={() => setAberto(false)}
                            />
                        </RowList>
                    </SheetContent>
                </Sheet>
            </>
        );
    },
} satisfies Meta<typeof SheetContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BottomSheet: Story = {
    name: 'Bottom sheet',
};

export const PainelDireito: Story = {
    name: 'Painel à direita',
    args: {side: 'right'},
};

export const PainelEsquerdo: Story = {
    name: 'Painel à esquerda',
    args: {side: 'left'},
};

export const ComDescricaoEAcoes: Story = {
    name: 'Com descrição e ações',
    render: (args) => {
        const [aberto, setAberto] = React.useState(false);
        return (
            <>
                <ButtonSecondary onPress={() => setAberto(true)}>
                    Confirmar portabilidade
                </ButtonSecondary>
                <Sheet open={aberto} onOpenChange={setAberto}>
                    <SheetContent {...args}>
                        <SheetTitle asChild>
                            <Text as="h2" preset="drawer-title" weight="medium">
                                Confirmar portabilidade
                            </Text>
                        </SheetTitle>
                        <SheetDescription asChild>
                            <Text as="p" preset="text2" color="secondary" className="mt-2">
                                Seu número (11) 99999-0000 será transferido para a Vivo em até 3
                                dias úteis. Você continua usando a linha normalmente.
                            </Text>
                        </SheetDescription>
                        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                            <ButtonPrimary onPress={() => setAberto(false)}>Confirmar</ButtonPrimary>
                            <ButtonLink onPress={() => setAberto(false)}>Agora não</ButtonLink>
                        </div>
                    </SheetContent>
                </Sheet>
            </>
        );
    },
};
