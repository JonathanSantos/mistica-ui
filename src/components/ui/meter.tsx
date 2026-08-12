
import {cn} from '@/lib/utils';

/**
 * Meter Mistica (tipo linear): barra segmentada sobre o trilho barTrack.
 * Cada secao tem um valor (0-1) e opcionalmente uma cor; a paleta padrao
 * segue o Meter do Mistica: roxo (brand), laranja (atencao) e cinza.
 */
const DEFAULT_COLORS = [
    'var(--mistica-control-activated)',
    'var(--mistica-warning)',
    'var(--mistica-control)',
];

type MeterProps = {
    /** Valores de 0 a 1; a soma e limitada a 1. */
    values: Array<number>;
    /** Cores CSS por secao (padrao: paleta de categorias do skin). */
    colors?: Array<string>;
    'aria-label'?: string;
    className?: string;
};

function Meter({values, colors = DEFAULT_COLORS, className, ...props}: MeterProps) {
    const total = Math.min(
        1,
        values.reduce((sum, v) => sum + Math.max(0, v), 0)
    );

    return (
        <div
            data-slot="meter"
            role="meter"
            aria-valuemin={0}
            aria-valuemax={1}
            aria-valuenow={total}
            className={cn('flex h-2 w-full gap-0.5 overflow-hidden rounded-mistica-bar bg-mistica-bar-track', className)}
            {...props}
        >
            {values.map((v, i) =>
                v > 0 ? (
                    <div
                        key={i}
                        className="h-full rounded-mistica-bar transition-[width] duration-300"
                        style={{width: `${Math.max(0, v) * 100}%`, background: colors[i % colors.length]}}
                    />
                ) : null
            )}
        </div>
    );
}

export {Meter};
