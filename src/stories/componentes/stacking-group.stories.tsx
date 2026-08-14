import type {Meta, StoryObj} from '@storybook/react-vite';

import {Avatar, StackingGroup} from '@/components/mistica';

/**
 * `StackingGroup` do Mistica: itens circulares sobrepostos (avatares) com
 * contador "+N" quando a quantidade ultrapassa `maxItems`.
 */
const meta = {
    title: 'Componentes/StackingGroup',
    component: StackingGroup,
    args: {
        maxItems: 4,
        size: 40,
        children: [
            <Avatar key="ab" initials="AB" />,
            <Avatar key="cd" initials="CD" />,
            <Avatar key="foto" src="https://picsum.photos/seed/pessoa1/200/200" alt="" />,
            <Avatar key="ef" initials="EF" />,
            <Avatar key="gh" initials="GH" />,
            <Avatar key="ij" initials="IJ" />,
        ],
    },
    argTypes: {
        maxItems: {control: {type: 'number', min: 1, max: 6}, description: 'Máximo visível antes do "+N"'},
        size: {control: 'number', description: 'Tamanho do círculo do "+N"'},
        children: {control: false, description: 'Avatares ou itens circulares'},
    },
} satisfies Meta<typeof StackingGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
    name: 'Padrão',
};

export const SemContador: Story = {
    name: 'Sem contador',
    args: {
        children: [
            <Avatar key="ab" initials="AB" />,
            <Avatar key="cd" initials="CD" />,
            <Avatar key="ef" initials="EF" />,
        ],
    },
};

export const ComFotos: Story = {
    name: 'Com fotos maiores',
    args: {
        size: 56,
        maxItems: 3,
        children: [
            <Avatar key="p1" size={56} src="https://picsum.photos/seed/pessoa1/200/200" alt="" />,
            <Avatar key="p2" size={56} src="https://picsum.photos/seed/pessoa2/200/200" alt="" />,
            <Avatar key="p3" size={56} src="https://picsum.photos/seed/pessoa3/200/200" alt="" />,
            <Avatar key="p4" size={56} src="https://picsum.photos/seed/pessoa4/200/200" alt="" />,
            <Avatar key="p5" size={56} src="https://picsum.photos/seed/pessoa5/200/200" alt="" />,
        ],
    },
};
