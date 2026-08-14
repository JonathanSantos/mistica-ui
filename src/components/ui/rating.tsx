import * as React from 'react';
import {Star} from 'lucide-react';

import {cn} from '@/lib/utils';

/**
 * Rating Mistica: estrelas selecionaveis com controlActivated.
 *
 * API identica ao @telefonica/mistica (variante quantitativa): value/
 * defaultValue, onChangeValue, count, valueLabels e disabled. Para exibicao
 * somente leitura use o InfoRating (com suporte a meia estrela).
 */
type RatingProps = {
    value?: number;
    defaultValue?: number;
    onChangeValue?: (value: number) => void;
    count?: number;
    size?: number;
    disabled?: boolean;
    /** Rotulos de acessibilidade por estrela (1..count). */
    valueLabels?: Array<string>;
    'aria-label'?: string;
    className?: string;
};

function Rating({
    value,
    defaultValue = 0,
    onChangeValue,
    count = 5,
    size = 32,
    disabled,
    valueLabels,
    'aria-label': ariaLabel = 'Avaliação',
    className,
}: RatingProps) {
    const [interno, setInterno] = React.useState(defaultValue);
    const atual = value ?? interno;
    const [hovered, setHovered] = React.useState(0);
    const active = hovered || atual;

    return (
        <div
            data-slot="rating"
            role="radiogroup"
            aria-label={ariaLabel}
            className={cn('flex gap-1', disabled && 'pointer-events-none opacity-50', className)}
            onMouseLeave={() => setHovered(0)}
        >
            {Array.from({length: count}, (_, i) => {
                const starValue = i + 1;
                const label =
                    valueLabels?.[i] ?? `${starValue} ${starValue === 1 ? 'estrela' : 'estrelas'}`;
                return (
                    <button
                        key={i}
                        type="button"
                        role="radio"
                        aria-checked={atual === starValue}
                        aria-label={label}
                        disabled={disabled}
                        onClick={() => {
                            setInterno(starValue);
                            onChangeValue?.(starValue);
                        }}
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

/** Estrela com fracao preenchida (0, 0.5 ou 1) para o InfoRating. */
function EstrelaInfo({fracao, size}: {fracao: number; size: number}) {
    return (
        <span className="relative inline-flex" style={{width: size, height: size}}>
            <Star width={size} height={size} aria-hidden className="text-mistica-control" />
            {fracao > 0 ? (
                <span
                    aria-hidden
                    className="absolute inset-0 overflow-hidden"
                    style={{width: size * fracao}}
                >
                    <Star
                        width={size}
                        height={size}
                        className="fill-mistica-control-activated text-mistica-control-activated"
                    />
                </span>
            ) : null}
        </span>
    );
}

/**
 * InfoRating Mistica: exibicao somente leitura da nota, com meia estrela
 * quando withHalfValue (senao arredonda para inteiro).
 */
type InfoRatingProps = {
    value?: number;
    count?: number;
    size?: number;
    withHalfValue?: boolean;
    'aria-label'?: string;
    className?: string;
};

function InfoRating({
    value = 0,
    count = 5,
    size = 20,
    withHalfValue,
    'aria-label': ariaLabel = 'Avaliação',
    className,
}: InfoRatingProps) {
    const exibido = withHalfValue ? Math.round(value * 2) / 2 : Math.round(value);

    return (
        <div
            data-slot="info-rating"
            role="img"
            aria-label={`${ariaLabel}: ${value} de ${count}`}
            className={cn('flex gap-1', className)}
        >
            {Array.from({length: count}, (_, i) => (
                <EstrelaInfo key={i} size={size} fracao={Math.min(1, Math.max(0, exibido - i))} />
            ))}
        </div>
    );
}

export {Rating, InfoRating};
