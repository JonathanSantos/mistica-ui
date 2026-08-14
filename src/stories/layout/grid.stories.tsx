import type {Meta, StoryObj} from '@storybook/react-vite';

import {Grid, Placeholder} from '@/components/mistica';

/**
 * `Grid`: grade com colunas fixas (`columns` — colapsa para 1 coluna no
 * mobile por padrão) ou fluidas (`minColumnWidth` → auto-fill), com `gap`
 * em px. Equivale ao `GridLayout` do Mistica original.
 */
const meta = {
    title: 'Layout/Grid',
    component: Grid,
    args: {
        columns: 2,
        gap: 16,
        collapseOnMobile: true,
        children: (
            <>
                {Array.from({length: 4}, (_, i) => (
                    <Placeholder key={i} height={96} />
                ))}
            </>
        ),
    },
    argTypes: {
        columns: {control: 'number', description: 'Número de colunas fixas'},
        minColumnWidth: {
            control: 'number',
            description: 'Largura mínima por coluna (px) — ativa auto-fill e ignora columns',
        },
        gap: {control: 'number', description: 'Espaço entre células (px)'},
        collapseOnMobile: {control: 'boolean', description: '1 coluna até 1024px'},
        children: {control: false},
    },
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DuasColunas: Story = {
    name: 'Duas colunas',
};

export const TresColunas: Story = {
    name: 'Três colunas',
    args: {
        columns: 3,
        children: (
            <>
                {Array.from({length: 6}, (_, i) => (
                    <Placeholder key={i} height={96} />
                ))}
            </>
        ),
    },
};

export const ColunasFluidas: Story = {
    name: 'Colunas fluidas (minColumnWidth)',
    args: {
        minColumnWidth: 140,
        gap: 8,
        children: (
            <>
                {Array.from({length: 8}, (_, i) => (
                    <Placeholder key={i} height={72} />
                ))}
            </>
        ),
    },
};

export const SemColapso: Story = {
    name: 'Sem colapso no mobile',
    args: {collapseOnMobile: false},
};
