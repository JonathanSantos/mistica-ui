import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';

import {cn} from '@/lib/utils';

/** ProgressBar Mistica: trilho barTrack de 4px, preenchimento controlActivated. */
function ProgressBar({
    className,
    value = 0,
    error = false,
    ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root> & {error?: boolean}) {
    return (
        <ProgressPrimitive.Root
            data-slot="progress-bar"
            value={value}
            className={cn('relative h-1 w-full overflow-hidden rounded-mistica-bar bg-mistica-bar-track', className)}
            {...props}
        >
            <ProgressPrimitive.Indicator
                data-slot="progress-bar-indicator"
                className={cn(
                    'size-full rounded-mistica-bar transition-transform duration-300',
                    error ? 'bg-mistica-control-error' : 'bg-mistica-control-activated'
                )}
                style={{transform: `translateX(-${100 - (value ?? 0)}%)`}}
            />
        </ProgressPrimitive.Root>
    );
}

/** ProgressBarStepped Mistica: barra segmentada por passos concluidos. */
function ProgressBarStepped({
    steps,
    currentStep,
    error = false,
    className,
    ...props
}: React.ComponentProps<'div'> & {steps: number; currentStep: number; error?: boolean}) {
    return (
        <div
            data-slot="progress-bar-stepped"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={steps}
            aria-valuenow={Math.max(0, Math.min(steps, currentStep))}
            className={cn('flex w-full gap-1', className)}
            {...props}
        >
            {Array.from({length: steps}, (_, i) => (
                <div
                    key={i}
                    className={cn(
                        'h-1 flex-1 rounded-mistica-bar transition-colors duration-300',
                        i < currentStep
                            ? error
                                ? 'bg-mistica-control-error'
                                : 'bg-mistica-control-activated'
                            : 'bg-mistica-bar-track'
                    )}
                />
            ))}
        </div>
    );
}

export {ProgressBar, ProgressBarStepped};
