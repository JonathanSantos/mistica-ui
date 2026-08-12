import * as React from 'react';

import {cn} from '@/lib/utils';
import {Text} from '@/components/ui/text';

/**
 * Timer / TextTimer Mistica: contagem regressiva ate endTimestamp.
 * TextTimer renderiza texto ("1d 02h 03min"); Timer renderiza unidades
 * em caixas com labels, como no mistica-web.
 */
type TimerUnit = {value: number; label: string; short: string};

function useCountdown(endTimestamp: number, onFinish?: () => void): Array<TimerUnit> {
    const [remainingMs, setRemainingMs] = React.useState(() => Math.max(0, endTimestamp - Date.now()));
    const finishedRef = React.useRef(false);

    React.useEffect(() => {
        const tick = () => {
            const next = Math.max(0, endTimestamp - Date.now());
            setRemainingMs(next);
            if (next === 0 && !finishedRef.current) {
                finishedRef.current = true;
                onFinish?.();
            }
        };
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, [endTimestamp, onFinish]);

    const totalSeconds = Math.floor(remainingMs / 1000);
    return [
        {value: Math.floor(totalSeconds / 86400), label: 'dias', short: 'd'},
        {value: Math.floor((totalSeconds % 86400) / 3600), label: 'horas', short: 'h'},
        {value: Math.floor((totalSeconds % 3600) / 60), label: 'min', short: 'min'},
        {value: totalSeconds % 60, label: 'seg', short: 's'},
    ];
}

type TimerProps = {
    /** Timestamp (ms) do fim da contagem. */
    endTimestamp: number;
    onFinish?: () => void;
    /** Esconde unidades zeradas a esquerda (padrao true). */
    hideEmptyUnits?: boolean;
    className?: string;
};

function TextTimer({endTimestamp, onFinish, hideEmptyUnits = true, className}: TimerProps) {
    const units = useCountdown(endTimestamp, onFinish);
    const firstVisible = hideEmptyUnits ? units.findIndex((u, i) => u.value > 0 || i >= units.length - 2) : 0;

    return (
        <span data-slot="text-timer" className={cn('tabular-nums text-mistica-text-primary', className)}>
            {units
                .slice(firstVisible)
                .map((u) => `${String(u.value).padStart(2, '0')}${u.short}`)
                .join(' ')}
        </span>
    );
}

function Timer({endTimestamp, onFinish, hideEmptyUnits = true, className}: TimerProps) {
    const units = useCountdown(endTimestamp, onFinish);
    const firstVisible = hideEmptyUnits ? units.findIndex((u, i) => u.value > 0 || i >= units.length - 2) : 0;

    return (
        <div data-slot="timer" className={cn('flex gap-2', className)}>
            {units.slice(firstVisible).map((unit) => (
                <div
                    key={unit.label}
                    className="flex min-w-14 flex-col items-center gap-1 rounded-mistica-media-small border border-mistica-border bg-mistica-background-container px-2 py-2"
                >
                    <Text as="span" preset="text5" className="tabular-nums">
                        {String(unit.value).padStart(2, '0')}
                    </Text>
                    <Text as="span" preset="text1" color="secondary">
                        {unit.label}
                    </Text>
                </div>
            ))}
        </div>
    );
}

export {Timer, TextTimer};
