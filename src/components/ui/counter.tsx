import {Minus, Plus, Trash2} from 'lucide-react';

import {cn} from '@/lib/utils';

/**
 * Counter Mistica: seletor de quantidade [- n +] com borda de container,
 * botoes com controlActivated e opcao de remover no minimo.
 */
type CounterProps = {
    value: number;
    onValueChange: (value: number) => void;
    min?: number;
    max?: number;
    /** Chamado ao apertar o lixo quando value === min (se definido, mostra lixo no minimo). */
    onRemove?: () => void;
    disabled?: boolean;
    className?: string;
};

function Counter({value, onValueChange, min = 0, max = 99, onRemove, disabled, className}: CounterProps) {
    const atMin = value <= min;
    const atMax = value >= max;
    const showTrash = Boolean(onRemove) && atMin;

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
                aria-label={showTrash ? 'Remover' : 'Diminuir'}
                disabled={disabled || (atMin && !showTrash)}
                onClick={() => (showTrash ? onRemove?.() : onValueChange(Math.max(min, value - 1)))}
                className={buttonClasses}
            >
                {showTrash ? <Trash2 className="size-5" /> : <Minus className="size-5" />}
            </button>
            <output aria-live="polite" className="min-w-8 text-center text-base font-medium text-mistica-text-primary">
                {value}
            </output>
            <button
                type="button"
                aria-label="Aumentar"
                disabled={disabled || atMax}
                onClick={() => onValueChange(Math.min(max, value + 1))}
                className={buttonClasses}
            >
                <Plus className="size-5" />
            </button>
        </div>
    );
}

export {Counter};
