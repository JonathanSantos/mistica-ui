import type {Meta, StoryObj} from '@storybook/react-vite';
import {Info} from 'lucide-react';

import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '@/components/mistica';

/**
 * Tooltip do Mistica: container claro com sombra e seta, exibido ao passar o
 * mouse ou focar o trigger. Composição Radix: `TooltipProvider`, `Tooltip`,
 * `TooltipTrigger` e `TooltipContent`.
 */
const meta = {
    title: 'Componentes/Tooltip',
    component: TooltipContent,
    args: {
        children: 'Franquia renovada todo dia 10',
        side: 'top',
        sideOffset: 8,
    },
    argTypes: {
        children: {control: 'text', description: 'Conteúdo do tooltip'},
        side: {
            control: 'select',
            options: ['top', 'right', 'bottom', 'left'],
            description: 'Lado em que o tooltip abre',
        },
        sideOffset: {control: 'number', description: 'Distância do trigger em px'},
    },
    render: (args) => (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger
                    aria-label="Mais informações"
                    className="flex size-12 cursor-pointer items-center justify-center rounded-full bg-mistica-brand-low text-mistica-control-activated outline-none hover:opacity-90 focus-visible:ring-2 focus-visible:ring-mistica-control-activated"
                >
                    <Info className="size-6" />
                </TooltipTrigger>
                <TooltipContent {...args} />
            </Tooltip>
        </TooltipProvider>
    ),
} satisfies Meta<typeof TooltipContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
    name: 'Padrão',
};

export const AbertoPorPadrao: Story = {
    name: 'Aberto por padrão',
    render: (args) => (
        <TooltipProvider>
            <Tooltip defaultOpen>
                <TooltipTrigger
                    aria-label="Mais informações"
                    className="flex size-12 cursor-pointer items-center justify-center rounded-full bg-mistica-brand-low text-mistica-control-activated outline-none hover:opacity-90 focus-visible:ring-2 focus-visible:ring-mistica-control-activated"
                >
                    <Info className="size-6" />
                </TooltipTrigger>
                <TooltipContent {...args} />
            </Tooltip>
        </TooltipProvider>
    ),
};

export const Embaixo: Story = {
    args: {children: 'O bônus expira em 31/08', side: 'bottom'},
};
