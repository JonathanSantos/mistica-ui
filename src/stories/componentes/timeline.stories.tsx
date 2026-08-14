import type {Meta, StoryObj} from '@storybook/react-vite';

import {Timeline, TimelineItem} from '@/components/mistica';

/**
 * `Timeline` do Mistica: linha do tempo vertical com marcadores
 * (`completed`, `active`, `default`) conectados por uma linha. Cada
 * `TimelineItem` aceita `title`, `description`, `right` (data/hora) e
 * `asset` (conteúdo do marcador).
 */
const meta = {
    title: 'Componentes/Timeline',
    component: Timeline,
    args: {
        children: (
            <>
                <TimelineItem
                    state="completed"
                    title="Pedido recebido"
                    description="Pagamento aprovado"
                    right="10:32"
                />
                <TimelineItem
                    state="completed"
                    title="Em separação"
                    description="Chip sendo preparado"
                    right="11:15"
                />
                <TimelineItem state="active" title="Em transporte" description="Previsão: amanhã" />
                <TimelineItem state="default" title="Entregue" />
            </>
        ),
    },
    argTypes: {
        children: {control: false, description: 'Itens (`TimelineItem`)'},
    },
} satisfies Meta<typeof Timeline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
    name: 'Padrão',
    render: (args) => (
        <div className="max-w-md">
            <Timeline {...args} />
        </div>
    ),
};

export const MarcadoresNumerados: Story = {
    name: 'Marcadores numerados',
    render: () => (
        <div className="max-w-md">
            <Timeline>
                <TimelineItem state="completed" asset="1" title="Escolha o plano" description="Vivo Pós 50 GB" />
                <TimelineItem state="active" asset="2" title="Informe seus dados" description="Documento e endereço" />
                <TimelineItem state="default" asset="3" title="Portabilidade" description="Traga seu número" />
                <TimelineItem state="default" asset="4" title="Receba o chip" />
            </Timeline>
        </div>
    ),
};

export const Simples: Story = {
    name: 'Sem descrições',
    render: () => (
        <div className="max-w-md">
            <Timeline>
                <TimelineItem state="completed" title="Fatura emitida" right="01/08" />
                <TimelineItem state="completed" title="Fatura enviada por e-mail" right="02/08" />
                <TimelineItem state="active" title="Aguardando pagamento" right="vence 10/08" />
            </Timeline>
        </div>
    ),
};
