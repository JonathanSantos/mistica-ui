import type {Meta, StoryObj} from '@storybook/react-vite';
import * as React from 'react';
import {fn} from 'storybook/test';

import {Slider, Text} from '@/components/mistica';

/**
 * Slider do Mistica: trilho de 4px (barTrack) com faixa e knob na cor
 * controlActivated. Aceita as props do Radix Slider (`defaultValue`,
 * `value`, `onValueChange`, `min`, `max`, `step`, `disabled`).
 */
const meta = {
    title: 'Componentes/Slider',
    component: Slider,
    args: {
        defaultValue: [40],
        min: 0,
        max: 100,
        step: 1,
        disabled: false,
        onValueChange: fn(),
    },
    argTypes: {
        min: {control: 'number'},
        max: {control: 'number'},
        step: {control: 'number'},
        disabled: {control: 'boolean'},
    },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
    name: 'Padrão',
};

export const ComPasso: Story = {
    name: 'Com passo de 10',
    args: {defaultValue: [50], step: 10},
};

export const Desabilitado: Story = {
    args: {defaultValue: [70], disabled: true},
};

export const Controlado: Story = {
    render: (args) => {
        const [gigas, setGigas] = React.useState([25]);
        return (
            <div className="grid w-80 gap-3">
                <Text preset="text1">Franquia de dados: {gigas[0]} GB</Text>
                <Slider
                    value={gigas}
                    onValueChange={(valor) => {
                        setGigas(valor);
                        args.onValueChange?.(valor);
                    }}
                    min={5}
                    max={100}
                    step={5}
                />
            </div>
        );
    },
};
