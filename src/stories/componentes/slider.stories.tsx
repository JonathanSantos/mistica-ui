import * as React from 'react';
import type {Meta, StoryObj} from '@storybook/react-webpack5';
import {fn} from 'storybook/test';

import {Slider, Text} from '@/components/mistica';

/**
 * Slider do Mistica: trilho de 4px (barTrack) com faixa e knob na cor
 * controlActivated. API do `@telefonica/mistica`: `name`, valor único
 * (`value`/`defaultValue` + `onChangeValue`), `tooltip` e escala por
 * `min`/`max`/`step` ou por uma lista discreta `values`.
 */
const meta = {
    title: 'Componentes/Slider',
    component: Slider,
    args: {
        name: 'exemplo',
        defaultValue: 40,
        min: 0,
        max: 100,
        step: 1,
        tooltip: false,
        disabled: false,
        onChangeValue: fn(),
    },
    argTypes: {
        min: {control: 'number'},
        max: {control: 'number'},
        step: {control: 'number'},
        tooltip: {control: 'boolean', description: 'Bolha com o valor durante a interação'},
        disabled: {control: 'boolean'},
    },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
    name: 'Padrão',
};

export const ComTooltip: Story = {
    name: 'Com tooltip',
    args: {defaultValue: 60, tooltip: true},
};

export const ValoresDiscretos: Story = {
    name: 'Com values discretos',
    args: {name: 'franquia', values: [5, 10, 25, 50, 100], defaultValue: 25, tooltip: true},
};

export const Desabilitado: Story = {
    args: {defaultValue: 70, disabled: true},
};

export const Controlado: Story = {
    render: (args) => {
        const [gigas, setGigas] = React.useState(25);
        return (
            <div className="grid w-80 gap-3">
                <Text preset="text1">Franquia de dados: {gigas} GB</Text>
                <Slider
                    name="franquia-controlada"
                    value={gigas}
                    onChangeValue={(valor) => {
                        setGigas(valor);
                        args.onChangeValue?.(valor);
                    }}
                    min={5}
                    max={100}
                    step={5}
                />
            </div>
        );
    },
};
