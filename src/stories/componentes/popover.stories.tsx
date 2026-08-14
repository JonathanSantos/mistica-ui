import type {Meta, StoryObj} from '@storybook/react-vite';
import {Info} from 'lucide-react';

import {
    ButtonSecondary,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Text,
} from '@/components/mistica';

/**
 * Popover do Mistica: container flutuante com radius de popup (16px) e sombra,
 * aberto por clique. Composição Radix: `Popover`, `PopoverTrigger`,
 * `PopoverAnchor`, `PopoverContent` e `PopoverClose`.
 */
const meta = {
    title: 'Componentes/Popover',
    component: PopoverContent,
    args: {side: 'bottom', align: 'center', sideOffset: 8},
    argTypes: {
        side: {
            control: 'select',
            options: ['top', 'right', 'bottom', 'left'],
            description: 'Lado em que o popover abre',
        },
        align: {
            control: 'select',
            options: ['start', 'center', 'end'],
            description: 'Alinhamento em relação ao trigger',
        },
        sideOffset: {control: 'number', description: 'Distância do trigger em px'},
    },
    render: (args) => (
        <Popover>
            <PopoverTrigger
                aria-label="Mais informações"
                className="flex size-12 cursor-pointer items-center justify-center rounded-full bg-mistica-brand-low text-mistica-control-activated outline-none hover:opacity-90 focus-visible:ring-2 focus-visible:ring-mistica-control-activated"
            >
                <Info className="size-6" />
            </PopoverTrigger>
            <PopoverContent {...args}>
                <Text as="h3" preset="text2" weight="medium">
                    Franquia de dados
                </Text>
                <Text preset="text2" color="secondary" className="mt-1">
                    Sua franquia renova todo dia 10. O que sobrar não acumula para o mês
                    seguinte.
                </Text>
            </PopoverContent>
        </Popover>
    ),
} satisfies Meta<typeof PopoverContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
    name: 'Padrão',
};

export const AbertoPorPadrao: Story = {
    name: 'Aberto por padrão',
    render: (args) => (
        <Popover defaultOpen>
            <PopoverTrigger
                aria-label="Mais informações"
                className="flex size-12 cursor-pointer items-center justify-center rounded-full bg-mistica-brand-low text-mistica-control-activated outline-none hover:opacity-90 focus-visible:ring-2 focus-visible:ring-mistica-control-activated"
            >
                <Info className="size-6" />
            </PopoverTrigger>
            <PopoverContent {...args}>
                <Text preset="text2">Bônus de 5 GB ativo até 31/08.</Text>
            </PopoverContent>
        </Popover>
    ),
};

export const ComAcoes: Story = {
    name: 'Com ações',
    args: {align: 'start'},
    render: (args) => (
        <Popover>
            <PopoverTrigger
                aria-label="Sobre a fatura digital"
                className="flex size-12 cursor-pointer items-center justify-center rounded-full bg-mistica-brand-low text-mistica-control-activated outline-none hover:opacity-90 focus-visible:ring-2 focus-visible:ring-mistica-control-activated"
            >
                <Info className="size-6" />
            </PopoverTrigger>
            <PopoverContent {...args}>
                <Text as="h3" preset="text2" weight="medium">
                    Fatura digital
                </Text>
                <Text preset="text2" color="secondary" className="mt-1">
                    Receba a fatura por e-mail e ajude o meio ambiente.
                </Text>
                <div className="mt-3">
                    <ButtonSecondary small onPress={() => {}}>
                        Ativar agora
                    </ButtonSecondary>
                </div>
            </PopoverContent>
        </Popover>
    ),
};
