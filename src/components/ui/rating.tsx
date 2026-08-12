import * as React from 'react';
import {Star} from 'lucide-react';

import {cn} from '@/lib/utils';

/**
 * Rating Mistica (community): estrelas selecionaveis com controlActivated.
 * Controlado (value/onValueChange) ou somente leitura (readOnly).
 */
type RatingProps = {
    value: number;
    onValueChange?: (value: number) => void;
    max?: number;
    readOnly?: boolean;
    size?: number;
    'aria-label'?: string;
    className?: string;
};

function Rating({
    value,
    onValueChange,
    max = 5,
    readOnly = false,
    size = 32,
    'aria-label': ariaLabel = 'Avaliação',
    className,
}: RatingProps) {
    const [hovered, setHovered] = React.useState(0);
    const active = hovered || value;

    if (readOnly) {
        return (
            <div
                data-slot="rating"
                role="img"
                aria-label={`${ariaLabel}: ${value} de ${max}`}
                className={cn('flex gap-1', className)}
            >
                {Array.from({length: max}, (_, i) => (
                    <Star
                        key={i}
                        width={size}
                        height={size}
                        aria-hidden
                        className={
                            i < value
                                ? 'fill-mistica-control-activated text-mistica-control-activated'
                                : 'text-mistica-control'
                        }
                    />
                ))}
            </div>
        );
    }

    return (
        <div
            data-slot="rating"
            role="radiogroup"
            aria-label={ariaLabel}
            className={cn('flex gap-1', className)}
            onMouseLeave={() => setHovered(0)}
        >
            {Array.from({length: max}, (_, i) => {
                const starValue = i + 1;
                return (
                    <button
                        key={i}
                        type="button"
                        role="radio"
                        aria-checked={value === starValue}
                        aria-label={`${starValue} ${starValue === 1 ? 'estrela' : 'estrelas'}`}
                        onClick={() => onValueChange?.(starValue)}
                        onMouseEnter={() => setHovered(starValue)}
                        className="cursor-pointer rounded-sm outline-none transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-mistica-control-activated"
                    >
                        <Star
                            width={size}
                            height={size}
                            aria-hidden
                            className={
                                starValue <= active
                                    ? 'fill-mistica-control-activated text-mistica-control-activated'
                                    : 'text-mistica-control'
                            }
                        />
                    </button>
                );
            })}
        </div>
    );
}

export {Rating};
