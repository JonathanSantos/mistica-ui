import * as React from 'react';
import type {Meta, StoryObj} from '@storybook/react-vite';
import {fn} from 'storybook/test';
import {Bell, BellOff, Heart} from 'lucide-react';

import {ToggleIconButton} from '@/components/mistica';

/**
 * ToggleIconButton do Mistica: alterna entre dois estados descritos por
 * `checkedProps`/`uncheckedProps` (`{Icon, type, backgroundType, aria-label}`).
 * Não controlado via `defaultChecked` ou controlado via `checked` + `onChange`.
 */
const meta = {
    title: 'Componentes/Botões/ToggleIconButton',
    component: ToggleIconButton,
    args: {
        checkedProps: {
            Icon: Heart,
            type: 'brand',
            backgroundType: 'soft',
            'aria-label': 'Desfavoritar',
        },
        uncheckedProps: {Icon: Heart, 'aria-label': 'Favoritar'},
        defaultChecked: false,
        onChange: fn(),
        small: false,
        disabled: false,
    },
    argTypes: {
        defaultChecked: {control: 'boolean', description: 'Estado inicial (não controlado)'},
        small: {control: 'boolean', description: 'Tamanho reduzido'},
        disabled: {control: 'boolean'},
    },
} satisfies Meta<typeof ToggleIconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
    name: 'Padrão (favoritar)',
};

export const MarcadoInicialmente: Story = {
    name: 'Marcado inicialmente',
    args: {defaultChecked: true},
};

export const Notificacoes: Story = {
    name: 'Notificações (silenciar)',
    args: {
        checkedProps: {Icon: BellOff, type: 'brand', 'aria-label': 'Reativar notificações'},
        uncheckedProps: {Icon: Bell, 'aria-label': 'Silenciar notificações'},
    },
};

export const Controlado: Story = {
    render: (args) => {
        const [favorito, setFavorito] = React.useState(true);
        return (
            <ToggleIconButton
                {...args}
                checked={favorito}
                onChange={(valor) => {
                    setFavorito(valor);
                    args.onChange?.(valor);
                }}
            />
        );
    },
};
