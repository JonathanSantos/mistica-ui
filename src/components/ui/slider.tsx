import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

import {cn} from '@/lib/utils';

/**
 * Slider Mistica: trilho barTrack de 4px, faixa e knob controlActivated.
 *
 * API identica ao @telefonica/mistica: valor unico (value/defaultValue +
 * onChangeValue), name obrigatorio, tooltip com o valor atual e escala por
 * min/max/step OU por uma lista discreta `values`.
 */
type SliderProps = {
    name: string;
    value?: number;
    defaultValue?: number;
    onChangeValue?: (value: number) => void;
    /** Mostra o valor atual numa bolha sobre o knob durante a interacao. */
    tooltip?: boolean;
    disabled?: boolean;
    step?: number;
    min?: number;
    max?: number;
    /** Valores discretos permitidos (substitui min/max/step). */
    values?: ReadonlyArray<number>;
    'aria-label'?: string;
    id?: string;
    className?: string;
};

function Slider({
    name,
    value,
    defaultValue,
    onChangeValue,
    tooltip,
    disabled,
    step = 1,
    min = 0,
    max = 100,
    values,
    'aria-label': ariaLabel,
    id,
    className,
}: SliderProps) {
    const discreto = Boolean(values && values.length > 0);
    const [interno, setInterno] = React.useState(
        defaultValue ?? (discreto ? values![0] : min)
    );
    const atual = value ?? interno;

    // Com `values`, o Radix trabalha no espaco de indices [0, n-1]
    const radixValue = discreto ? Math.max(0, values!.indexOf(atual)) : atual;

    const aoMudar = ([v]: number[]) => {
        const proximo = discreto ? values![v] : v;
        setInterno(proximo);
        onChangeValue?.(proximo);
    };

    return (
        <SliderPrimitive.Root
            data-slot="slider"
            name={name}
            id={id}
            value={[radixValue]}
            onValueChange={aoMudar}
            min={discreto ? 0 : min}
            max={discreto ? values!.length - 1 : max}
            step={discreto ? 1 : step}
            disabled={disabled}
            className={cn(
                'relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50',
                className
            )}
        >
            <SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden rounded-mistica-bar bg-mistica-bar-track">
                <SliderPrimitive.Range className="absolute h-full bg-mistica-control-activated" />
            </SliderPrimitive.Track>
            <SliderPrimitive.Thumb
                data-slot="slider-thumb"
                aria-label={ariaLabel}
                className="group relative block size-5 cursor-pointer rounded-full bg-mistica-control-activated shadow-[0_1px_3px_rgba(0,0,0,0.3)] transition-transform outline-none hover:scale-110 focus-visible:ring-2 focus-visible:ring-mistica-control-activated focus-visible:ring-offset-2 focus-visible:ring-offset-mistica-background"
            >
                {tooltip ? (
                    <span
                        aria-hidden
                        className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 rounded-mistica-media-small bg-mistica-control-activated px-2 py-1 text-xs font-medium whitespace-nowrap text-mistica-inverse opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 group-active:opacity-100"
                    >
                        {atual}
                    </span>
                ) : null}
            </SliderPrimitive.Thumb>
        </SliderPrimitive.Root>
    );
}

export {Slider};
