import type {Meta, StoryObj} from '@storybook/react-vite';

import {Divider, Text} from '@/components/mistica';

/**
 * `Divider` do Mistica: linha horizontal de 1px com o token divider,
 * usada para separar conteúdos e itens de lista.
 */
const meta = {
    title: 'Componentes/Divider',
    component: Divider,
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
    render: (args) => (
        <div className="grid w-80 gap-3">
            <Text preset="text2">Plano Vivo Controle 20 GB</Text>
            <Divider {...args} />
            <Text preset="text2" color="secondary">
                Renovação em 12/09
            </Text>
        </div>
    ),
};

export const EntreItens: Story = {
    name: 'Entre itens de lista',
    render: () => (
        <div className="w-80 rounded-mistica-media-small border border-mistica-border">
            {['Fatura de junho', 'Fatura de julho', 'Fatura de agosto'].map((fatura, i) => (
                <div key={fatura}>
                    {i > 0 && <Divider />}
                    <div className="flex items-center justify-between px-4 py-3">
                        <Text preset="text2">{fatura}</Text>
                        <Text preset="text2" weight="medium">
                            R$ 89,90
                        </Text>
                    </div>
                </div>
            ))}
        </div>
    ),
};
