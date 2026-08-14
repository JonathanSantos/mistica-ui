import * as React from 'react';
import type {Meta, StoryObj} from '@storybook/react-webpack5';
import {fn} from 'storybook/test';
import {Smartphone, Wifi} from 'lucide-react';

import {
    Avatar,
    Boxed,
    Circle,
    NegativeBox,
    OrderedList,
    RadioGroup,
    Row,
    RowList,
    Tag,
    Text,
    UnorderedList,
} from '@/components/mistica';

/**
 * Listas do Mistica: `Row`/`RowList` (linhas com asset, título, subtítulo,
 * controle ou chevron — API `onPress`, `switch`, `checkbox`, `radioValue`,
 * `badge`), `Boxed`/`NegativeBox` (containers) e `UnorderedList`/
 * `OrderedList` (listas tipográficas).
 */
const meta = {
    title: 'Componentes/Listas',
    component: Row,
    args: {
        title: 'Vivo Fibra',
        subtitle: '700 Mega — instalado',
        onPress: fn(),
    },
    argTypes: {
        title: {control: 'text'},
        subtitle: {control: 'text'},
        description: {control: 'text'},
        chevron: {control: 'boolean', description: 'Força exibir/ocultar o chevron'},
        badge: {control: 'number', description: 'true = ponto; número = contador'},
        asset: {control: false, description: 'Ícone, Avatar ou qualquer asset à esquerda'},
        right: {control: false, description: 'Conteúdo à direita (substitui o chevron)'},
        headline: {control: false},
    },
} satisfies Meta<typeof Row>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
    name: 'Row',
    render: (args) => (
        <Boxed className="max-w-md">
            <Row {...args} />
        </Boxed>
    ),
};

export const Lista: Story = {
    name: 'RowList',
    render: () => (
        <Boxed className="max-w-md">
            <RowList>
                <Row
                    asset={<Avatar initials="VF" />}
                    title="Vivo Fibra"
                    subtitle="700 Mega — instalado"
                    right={<Tag type="success">Ativo</Tag>}
                />
                <Row
                    asset={
                        <Circle size={40}>
                            <Smartphone className="size-5" aria-hidden />
                        </Circle>
                    }
                    title="Vivo Pós"
                    subtitle="(11) 99999-0000"
                    onPress={fn()}
                />
                <Row
                    headline={<Tag type="promo">Novidade</Tag>}
                    title="Vivo Play"
                    subtitle="Canais e filmes inclusos"
                    href="#"
                />
            </RowList>
        </Boxed>
    ),
};

export const ComControles: Story = {
    name: 'Com switch, checkbox e badge',
    render: () => (
        <Boxed className="max-w-md">
            <RowList>
                <Row
                    title="Roaming internacional"
                    subtitle="Usar dados fora do Brasil"
                    switch={{defaultValue: false, onChange: fn()}}
                />
                <Row
                    title="Fatura por e-mail"
                    subtitle="Receber em PDF todo mês"
                    checkbox={{defaultValue: true, onChange: fn()}}
                />
                <Row title="Mensagens" subtitle="Central de notificações" badge={3} onPress={fn()} />
            </RowList>
        </Boxed>
    ),
};

export const ComRadio: Story = {
    name: 'Com radioValue (RadioGroup)',
    render: () => {
        const [plano, setPlano] = React.useState('controle');
        return (
            <div className="grid max-w-md gap-3">
                <RadioGroup name="plano" value={plano} onChange={setPlano} aria-label="Escolha o plano">
                    <Boxed>
                        <RowList>
                            <Row radioValue="easy" title="Vivo Easy" subtitle="10 GB + apps ilimitados" />
                            <Row radioValue="controle" title="Vivo Controle" subtitle="25 GB + WhatsApp grátis" />
                            <Row radioValue="pos" title="Vivo Pós" subtitle="50 GB para usar como quiser" />
                        </RowList>
                    </Boxed>
                </RadioGroup>
                <Text preset="text1" color="secondary">
                    Selecionado: {plano}
                </Text>
            </div>
        );
    },
};

export const BoxedENegativeBox: Story = {
    name: 'RowList boxed e NegativeBox',
    render: () => (
        <div className="grid max-w-md gap-6">
            <RowList boxed>
                <Row asset={<Circle size={40}><Wifi className="size-5" aria-hidden /></Circle>} title="Wi-Fi da casa" subtitle="Rede: VIVO-2G4" onPress={fn()} />
                <Row asset={<Avatar initials="JS" />} title="Linha adicional" subtitle="(11) 98888-0000" onPress={fn()} />
            </RowList>
            <Boxed className="p-4">
                <Text preset="text3" weight="medium">
                    Serviços da linha
                </Text>
                <NegativeBox>
                    <RowList>
                        <Row title="Vivo Bis" subtitle="Internet extra diária" onPress={fn()} />
                        <Row title="Vivo Sync" subtitle="Backup na nuvem" onPress={fn()} />
                    </RowList>
                </NegativeBox>
            </Boxed>
        </div>
    ),
};

export const Tipograficas: Story = {
    name: 'UnorderedList e OrderedList',
    render: () => (
        <div className="grid max-w-md gap-6">
            <UnorderedList>
                <li>50 GB de internet</li>
                <li>Ligações ilimitadas</li>
                <li>Apps de streaming inclusos</li>
            </UnorderedList>
            <OrderedList>
                <li>Escolha o plano ideal</li>
                <li>Informe seus dados</li>
                <li>Receba o chip em casa</li>
            </OrderedList>
        </div>
    ),
};
