import {Check} from 'lucide-react';

import {cn} from '@/lib/utils';

/**
 * Stepper Mistica: passos de um fluxo com transicoes animadas.
 * Concluido = circulo controlActivated com check (pop-in); atual = borda
 * ativa e numero; futuro = borda control. O conector enche/esvazia com
 * animacao ao avancar/voltar. Labels com o preset stepperStepLabel.
 */
type StepperProps = {
    steps: Array<string>;
    /** Indice do passo atual (0-based). */
    currentIndex: number;
    className?: string;
};

function Stepper({steps, currentIndex, className}: StepperProps) {
    return (
        <ol data-slot="stepper" className={cn('flex w-full items-start', className)}>
            {steps.map((step, index) => {
                const completed = index < currentIndex;
                const current = index === currentIndex;
                return (
                    <li
                        key={step}
                        aria-current={current ? 'step' : undefined}
                        className={cn('flex items-start', index > 0 && 'flex-1')}
                    >
                        {index > 0 ? (
                            <div
                                aria-hidden
                                className="relative mx-2 mt-4 h-0.5 flex-1 overflow-hidden rounded-mistica-bar bg-mistica-bar-track"
                            >
                                <div
                                    className={cn(
                                        'absolute inset-y-0 left-0 rounded-mistica-bar bg-mistica-control-activated transition-[width] duration-300 ease-out',
                                        completed || current ? 'w-full' : 'w-0'
                                    )}
                                />
                            </div>
                        ) : null}
                        <div className="flex max-w-24 flex-col items-center gap-2">
                            <div
                                className={cn(
                                    'flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-medium transition-[background-color,border-color,color] duration-300',
                                    completed && 'bg-mistica-control-activated text-mistica-inverse',
                                    current &&
                                        'border-2 border-mistica-control-activated bg-mistica-background-container text-mistica-text-activated dark:text-mistica-text-primary',
                                    !completed &&
                                        !current &&
                                        'border-2 border-mistica-control bg-mistica-background-container text-mistica-text-secondary dark:border-mistica-neutral-medium'
                                )}
                            >
                                {completed ? (
                                    <Check
                                        className="size-4 animate-in duration-300 zoom-in-50 fade-in"
                                        strokeWidth={3}
                                    />
                                ) : (
                                    index + 1
                                )}
                            </div>
                            <span
                                className={cn(
                                    'text-center transition-colors duration-300',
                                    current ? 'font-medium text-mistica-text-primary' : 'text-mistica-text-secondary'
                                )}
                                style={{
                                    fontSize: 'var(--mistica-text-size-stepper-step-label)',
                                    lineHeight: 'var(--mistica-text-line-height-stepper-step-label)',
                                }}
                            >
                                {step}
                            </span>
                        </div>
                    </li>
                );
            })}
        </ol>
    );
}

export {Stepper};
