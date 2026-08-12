import * as React from 'react';

import {cn} from '@/lib/utils';
import {Text} from '@/components/ui/text';

/**
 * EmptyState Mistica: icone/imagem + titulo + descricao + acoes,
 * centrado (tela) ou dentro de um card.
 */
type EmptyStateProps = {
    Icon?: React.ComponentType<{className?: string}>;
    /** Imagem alternativa ao icone. */
    imageSrc?: string;
    title: string;
    description?: string;
    actions?: React.ReactNode;
    /** true: renderiza dentro de um container boxed. */
    boxed?: boolean;
    className?: string;
};

function EmptyState({Icon, imageSrc, title, description, actions, boxed, className}: EmptyStateProps) {
    return (
        <div
            data-slot="empty-state"
            className={cn(
                'flex flex-col items-center gap-4 px-6 py-10 text-center',
                boxed && 'rounded-mistica-container border border-mistica-border bg-mistica-background-container',
                className
            )}
        >
            {imageSrc ? (
                <img src={imageSrc} alt="" className="size-28 rounded-mistica-media-small object-cover" />
            ) : Icon ? (
                <div className="flex size-16 items-center justify-center rounded-full bg-mistica-brand-low">
                    <Icon className="size-8 text-mistica-control-activated" aria-hidden />
                </div>
            ) : null}
            <div className="grid max-w-md gap-2">
                <Text as="h2" preset="title3">
                    {title}
                </Text>
                {description ? (
                    <Text preset="text2" color="secondary">
                        {description}
                    </Text>
                ) : null}
            </div>
            {actions ? <div className="mt-2 flex flex-wrap justify-center gap-3">{actions}</div> : null}
        </div>
    );
}

/** EmptyStateCard Mistica: EmptyState dentro de um container boxed. */
function EmptyStateCard(props: Omit<React.ComponentProps<typeof EmptyState>, 'boxed'>) {
    return <EmptyState boxed {...props} />;
}

export {EmptyState, EmptyStateCard};
