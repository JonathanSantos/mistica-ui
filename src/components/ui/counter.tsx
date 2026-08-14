import * as React from 'react';
import {Minus, Plus, Trash2} from 'lucide-react';

import {cn} from '@/lib/utils';

/**
 * Counter Mistica: seletor de quantidade [- n +] com borda de container,
 * botoes com controlActivated e opcao de remover no minimo.
 *
 * API identica ao @telefonica/mistica: value/defaultValue, onChangeValue,
 * min/max, onRemove e labels de acessibilidade.
 */
type CounterProps = {
    value?: number;
    defaultValue?: number;
    min?: number;
    max?: number;
    onChangeValue?: (value: number) => void;
    /** Chamado ao apertar o lixo quando value === min (se definido, mostra lixo no minimo). */
    onRemove?: () => void;
    disabled?: boolean;
    removeLabel?: string;
    increaseLabel?: string;
    decreaseLabel?: string;
    valueLabel?: string;
    className?: string;
};

function Counter({
    value,
    defaultValue = 0,
    min = 0,
    max = 99,
    onChangeValue,
    onRemove,
    disabled,
    removeLabel = 'Remover',
    increaseLabel = 'Aumentar',
    decreaseLabel = 'Diminuir',
    valueLabel = 'Quantidade',
    className,
}: CounterProps) {
    const [interno, setInterno] = React.useState(defaultValue);
    const atual = value ?? interno;
    const atMin = atual <= min;
    const atMax = atual >= max;
    const showTrash = Boolean(onRemove) && atMin;

    const mudar = (proximo: number) => {
        setInterno(proximo);
        onChangeValue?.(proximo);
    };

    const buttonClasses =
        'flex size-10 shrink-0 cursor-pointer items-center justify-center text-mistica-control-activated outline-none transition-colors hover:bg-mistica-background-container-hover active:bg-mistica-background-container-pressed focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-mistica-control-activated disabled:pointer-events-none disabled:text-mistica-control disabled:opacity-50';

    return (
        <div
            data-slot="counter"
            className={cn(
                'inline-flex items-center overflow-hidden rounded-mistica-button border border-mistica-border bg-mistica-background-container',
                disabled && 'pointer-events-none opacity-50',
                className
            )}
        >
            <button
                type="button"
                aria-label={showTrash ? removeLabel : decreaseLabel}
                disabled={disabled || (atMin && !showTrash)}
                onClick={() => (showTrash ? onRemove?.() : mudar(Math.max(min, atual - 1)))}
                className={buttonClasses}
            >
                {showTrash ? <Trash2 className="size-5" /> : <Minus className="size-5" />}
            </button>
            <output
                aria-live="polite"
                aria-label={valueLabel}
                className="min-w-8 text-center text-base font-medium text-mistica-text-primary"
            >
                {atual}
            </output>
            <button
                type="button"
                aria-label={increaseLabel}
                disabled={disabled || atMax}
                onClick={() => mudar(Math.min(max, atual + 1))}
                className={buttonClasses}
            >
                <Plus className="size-5" />
            </button>
        </div>
    );
}

export {Counter};
