import * as React from 'react';
import {Check} from 'lucide-react';

import {cn} from '@/lib/utils';
import {Text} from '@/components/ui/text';

/**
 * Timeline Mistica: linha do tempo vertical com marcadores
 * (concluido/ativo/futuro) conectados por uma linha.
 */
type TimelineItemProps = {
    title: string;
    description?: string;
    /** Texto auxiliar a direita (data/hora). */
    right?: React.ReactNode;
    state?: 'completed' | 'active' | 'default';
    /** Conteudo do marcador (numero, icone...). Padrao: check quando completed, ponto nos demais. */
    asset?: React.ReactNode;
    className?: string;
};

function TimelineItem({title, description, right, state = 'default', asset, className}: TimelineItemProps) {
    return (
        <li data-slot="timeline-item" className={cn('relative flex gap-4 pb-8 last:pb-0', className)}>
            {/* linha conectora (escondida no ultimo item) */}
            <span
                aria-hidden
                className="absolute top-8 bottom-0 left-4 w-0.5 -translate-x-1/2 rounded-mistica-bar bg-mistica-bar-track [li:last-child>&]:hidden"
            />
            <span
                className={cn(
                    'relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-medium transition-colors duration-300',
                    state === 'completed' && 'bg-mistica-control-activated text-mistica-inverse',
                    state === 'active' &&
                        'border-2 border-mistica-control-activated bg-mistica-background-container text-mistica-text-activated dark:text-mistica-text-primary',
                    state === 'default' &&
                        'border-2 border-mistica-control bg-mistica-background-container text-mistica-text-secondary dark:border-mistica-neutral-medium'
                )}
            >
                {asset ?? (state === 'completed' ? <Check className="size-4" strokeWidth={3} /> : <span className="size-2 rounded-full bg-current" />)}
            </span>
            <div className="flex min-w-0 flex-1 items-start justify-between gap-4 pt-1">
                <div className="grid gap-0.5">
                    <Text as="div" preset="text2" weight={state === 'active' ? 'medium' : 'regular'}>
                        {title}
                    </Text>
                    {description ? (
                        <Text as="div" preset="text2" color="secondary">
                            {description}
                        </Text>
                    ) : null}
                </div>
                {right ? (
                    <Text as="div" preset="text1" color="secondary" className="shrink-0 pt-0.5">
                        {right}
                    </Text>
                ) : null}
            </div>
        </li>
    );
}

function Timeline({children, className}: {children: React.ReactNode; className?: string}) {
    return (
        <ol data-slot="timeline" className={cn('grid', className)}>
            {children}
        </ol>
    );
}

export {Timeline, TimelineItem};
