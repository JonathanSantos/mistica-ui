import * as React from 'react';

import {cn} from '@/lib/utils';
import {Text} from '@/components/ui/text';

/**
 * EmptyState Mistica: icone/imagem + titulo + descricao + acoes,
 * centrado (tela) ou dentro de um card.
 */
type EmptyStateProps = {
    /** Como no Mistica: elemento pronto (icone/ilustracao). */
    asset?: React.ReactNode;
    imageUrl?: string;
    title: string;
    description?: string;
    /** Como no Mistica: ButtonPrimary/Secondary/Link prontos. */
    button?: React.ReactNode;
    buttonLink?: React.ReactNode;
    className?: string;
};

function EmptyState({asset, imageUrl, title, description, button, buttonLink, className}: EmptyStateProps) {
    const imagem = imageUrl;
    const acoes =
        button || buttonLink ? (
            <>
                {button}
                {buttonLink}
            </>
        ) : null;
    return (
        <div
            data-slot="empty-state"
            className={cn('flex flex-col items-center gap-4 px-6 py-10 text-center', className)}
        >
            {asset ? (
                asset
            ) : imagem ? (
                <img src={imagem} alt="" className="size-28 rounded-mistica-media-small object-cover" />
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
            {acoes ? <div className="mt-2 flex flex-wrap justify-center gap-3">{acoes}</div> : null}
        </div>
    );
}

/** EmptyStateCard Mistica: EmptyState dentro de um container boxed. */
function EmptyStateCard(props: EmptyStateProps) {
    return (
        <div className="overflow-hidden rounded-mistica-container border border-mistica-border bg-mistica-background-container">
            <EmptyState {...props} />
        </div>
    );
}

export {EmptyState, EmptyStateCard};
