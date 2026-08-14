import * as React from 'react';
import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {
    ButtonLink,
    ButtonPrimary,
    ButtonSecondary,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerTitle,
    Row,
    RowList,
    Tag,
} from '@/components/mistica';

/**
 * Drawer do Mistica: painel lateral direito com os paddings de drawer do skin
 * e título com preset drawerTitle. Composição Radix: `Drawer`, `DrawerTrigger`,
 * `DrawerContent`, `DrawerTitle`, `DrawerDescription`, `DrawerBody`,
 * `DrawerFooter` e `DrawerClose` (o X já vem no `DrawerContent`).
 */
const meta = {
    title: 'Componentes/Modais/Drawer',
    component: DrawerContent,
    render: () => {
        const [aberto, setAberto] = React.useState(false);
        return (
            <>
                <ButtonSecondary onPress={() => setAberto(true)}>Abrir drawer</ButtonSecondary>
                <Drawer open={aberto} onOpenChange={setAberto}>
                    <DrawerContent>
                        <DrawerTitle>Filtrar planos</DrawerTitle>
                        <DrawerDescription>
                            Escolha o que deve aparecer na lista de planos.
                        </DrawerDescription>
                        <DrawerBody>
                            <RowList>
                                <Row title="Somente 5G" subtitle="Planos com rede 5G inclusa" />
                                <Row
                                    title="Apps ilimitados"
                                    subtitle="Streaming e redes sociais sem descontar da franquia"
                                />
                                <Row title="Com roaming" subtitle="Internet para usar em viagens" />
                            </RowList>
                        </DrawerBody>
                        <DrawerFooter>
                            <ButtonLink onPress={() => setAberto(false)}>Limpar</ButtonLink>
                            <ButtonPrimary onPress={() => setAberto(false)}>
                                Aplicar filtros
                            </ButtonPrimary>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </>
        );
    },
} satisfies Meta<typeof DrawerContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
    name: 'Padrão',
};

export const DetalhesDaFatura: Story = {
    name: 'Detalhes da fatura',
    render: () => {
        const [aberto, setAberto] = React.useState(false);
        return (
            <>
                <ButtonSecondary onPress={() => setAberto(true)}>Ver fatura</ButtonSecondary>
                <Drawer open={aberto} onOpenChange={setAberto}>
                    <DrawerContent>
                        <DrawerTitle>Fatura de agosto</DrawerTitle>
                        <DrawerDescription>Vencimento em 10/09 — R$ 119,90</DrawerDescription>
                        <DrawerBody>
                            <RowList>
                                <Row
                                    title="Vivo Pós 50 GB"
                                    subtitle="Mensalidade"
                                    right={<Tag type="success">Paga</Tag>}
                                />
                                <Row title="Linha adicional" subtitle="(11) 98888-0000" />
                                <Row title="Serviços digitais" subtitle="Vivo Play + backup" />
                            </RowList>
                        </DrawerBody>
                        <DrawerFooter>
                            <ButtonLink onPress={() => setAberto(false)}>Baixar PDF</ButtonLink>
                            <ButtonPrimary onPress={() => setAberto(false)}>
                                Pagar fatura
                            </ButtonPrimary>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </>
        );
    },
};
