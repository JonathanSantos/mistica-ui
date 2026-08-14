import * as React from 'react';
import type {Meta, StoryObj} from '@storybook/react-webpack5';
import {fn} from 'storybook/test';
import {ChevronDown, Download, FileText, LogOut, MoreVertical, Settings, User} from 'lucide-react';

import {
    Menu,
    MenuCheckboxItem,
    MenuContent,
    MenuGroup,
    MenuItem,
    MenuLabel,
    MenuSeparator,
    MenuTrigger,
} from '@/components/mistica';

/**
 * Menu do Mistica (dropdown): container com radius de popup e itens no estilo
 * do Select. Composição Radix: `Menu`, `MenuTrigger`, `MenuContent`,
 * `MenuItem` (com `Icon` e `destructive`), `MenuCheckboxItem`, `MenuGroup`,
 * `MenuLabel` e `MenuSeparator`.
 */
const meta = {
    title: 'Componentes/Menu',
    component: MenuContent,
    args: {align: 'start', sideOffset: 8},
    argTypes: {
        align: {
            control: 'select',
            options: ['start', 'center', 'end'],
            description: 'Alinhamento em relação ao trigger',
        },
        sideOffset: {control: 'number', description: 'Distância do trigger em px'},
    },
    render: (args) => (
        <Menu>
            <MenuTrigger
                aria-label="Mais opções"
                className="inline-flex size-10 cursor-pointer items-center justify-center rounded-full text-mistica-neutral-high outline-none hover:bg-mistica-background-container-hover focus-visible:ring-2 focus-visible:ring-mistica-control-activated"
            >
                <MoreVertical className="size-5" />
            </MenuTrigger>
            <MenuContent {...args}>
                <MenuItem Icon={User} onSelect={fn()}>
                    Minha conta
                </MenuItem>
                <MenuItem Icon={Settings} onSelect={fn()}>
                    Configurações
                </MenuItem>
                <MenuSeparator />
                <MenuItem Icon={LogOut} destructive onSelect={fn()}>
                    Sair
                </MenuItem>
            </MenuContent>
        </Menu>
    ),
} satisfies Meta<typeof MenuContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
    name: 'Padrão',
};

export const ComSelecao: Story = {
    name: 'Com seleção (checkbox)',
    render: (args) => {
        const [porEmail, setPorEmail] = React.useState(true);
        const [porSms, setPorSms] = React.useState(false);
        return (
            <Menu>
                <MenuTrigger className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-mistica-border bg-mistica-background-container px-4 py-2.5 text-base text-mistica-text-primary outline-none hover:bg-mistica-background-container-hover focus-visible:ring-2 focus-visible:ring-mistica-control-activated">
                    Notificações
                    <ChevronDown className="size-4" />
                </MenuTrigger>
                <MenuContent {...args}>
                    <MenuLabel>Receber avisos por</MenuLabel>
                    <MenuCheckboxItem
                        checked={porEmail}
                        onCheckedChange={setPorEmail}
                        onSelect={(event) => event.preventDefault()}
                    >
                        E-mail
                    </MenuCheckboxItem>
                    <MenuCheckboxItem
                        checked={porSms}
                        onCheckedChange={setPorSms}
                        onSelect={(event) => event.preventDefault()}
                    >
                        SMS
                    </MenuCheckboxItem>
                </MenuContent>
            </Menu>
        );
    },
};

export const ComGrupos: Story = {
    name: 'Com grupos e labels',
    args: {align: 'start'},
    render: (args) => (
        <Menu>
            <MenuTrigger className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-mistica-border bg-mistica-background-container px-4 py-2.5 text-base text-mistica-text-primary outline-none hover:bg-mistica-background-container-hover focus-visible:ring-2 focus-visible:ring-mistica-control-activated">
                Ações da fatura
                <ChevronDown className="size-4" />
            </MenuTrigger>
            <MenuContent {...args}>
                <MenuGroup>
                    <MenuLabel>Fatura de agosto</MenuLabel>
                    <MenuItem Icon={Download} onSelect={fn()}>
                        Baixar PDF
                    </MenuItem>
                    <MenuItem Icon={FileText} onSelect={fn()}>
                        Ver código de barras
                    </MenuItem>
                </MenuGroup>
                <MenuSeparator />
                <MenuGroup>
                    <MenuLabel>Conta</MenuLabel>
                    <MenuItem Icon={Settings} onSelect={fn()}>
                        Forma de pagamento
                    </MenuItem>
                </MenuGroup>
            </MenuContent>
        </Menu>
    ),
};
