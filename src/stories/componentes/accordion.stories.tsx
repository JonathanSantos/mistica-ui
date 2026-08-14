import type {Meta, StoryObj} from '@storybook/react-vite';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
    Boxed,
} from '@/components/mistica';

const perguntas = (
    <>
        <AccordionItem value="fidelidade">
            <AccordionTrigger>Como funciona a fidelidade?</AccordionTrigger>
            <AccordionContent>
                O plano tem fidelidade de 12 meses. Cancelamentos antes do prazo têm multa
                proporcional ao tempo restante.
            </AccordionContent>
        </AccordionItem>
        <AccordionItem value="mudanca">
            <AccordionTrigger>Posso mudar de plano quando quiser?</AccordionTrigger>
            <AccordionContent>
                Sim, a mudança é aplicada no próximo ciclo de faturamento sem custo adicional.
            </AccordionContent>
        </AccordionItem>
        <AccordionItem value="cobertura">
            <AccordionTrigger>Como sei se tem cobertura 5G na minha região?</AccordionTrigger>
            <AccordionContent>
                Consulte o mapa de cobertura no app Vivo ou no site — basta informar o CEP.
            </AccordionContent>
        </AccordionItem>
    </>
);

/**
 * `Accordion` do Mistica: linhas com divider e chevron indicador, sobre o
 * Radix Accordion (`type="single" | "multiple"`, `collapsible`). Composição:
 * `AccordionItem`, `AccordionTrigger` e `AccordionContent`.
 */
const meta = {
    title: 'Componentes/Accordion',
    component: Accordion,
    args: {
        type: 'single',
        collapsible: true,
        children: perguntas,
    },
    argTypes: {
        type: {
            control: 'select',
            options: ['single', 'multiple'],
            description: 'Um item aberto por vez ou vários',
        },
        collapsible: {control: 'boolean', description: 'Permite fechar o item aberto (type="single")'},
        children: {control: false},
    },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
    name: 'Padrão',
};

export const Multiplo: Story = {
    name: 'Múltiplo',
    render: () => (
        <Accordion type="multiple" defaultValue={['fidelidade', 'mudanca']}>
            {perguntas}
        </Accordion>
    ),
};

export const DentroDeBoxed: Story = {
    name: 'Dentro de Boxed',
    render: () => (
        <Boxed className="max-w-xl px-4">
            <Accordion type="single" collapsible>
                {perguntas}
            </Accordion>
        </Boxed>
    ),
};
