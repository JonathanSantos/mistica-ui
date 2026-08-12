import * as React from 'react';

import {cn} from '@/lib/utils';
import {Text} from '@/components/ui/text';

/**
 * CoverHero Mistica: hero de largura total com imagem de fundo,
 * overlay escuro (backgroundOverlay) e conteudo inverso.
 */
type CoverHeroProps = {
    src: string;
    alt?: string;
    headline?: React.ReactNode;
    pretitle?: string;
    title: string;
    description?: string;
    actions?: React.ReactNode;
    /** Altura minima; padrao 400px. */
    minHeight?: number;
    /** Centraliza o conteudo (padrao: alinhado a esquerda/baixo). */
    centered?: boolean;
    className?: string;
};

function CoverHero({
    src,
    alt = '',
    headline,
    pretitle,
    title,
    description,
    actions,
    minHeight = 400,
    centered = false,
    className,
}: CoverHeroProps) {
    return (
        <section data-slot="cover-hero" className={cn('relative overflow-hidden', className)} style={{minHeight}}>
            <img src={src} alt={alt} className="absolute inset-0 size-full object-cover" />
            <div aria-hidden className="absolute inset-0 bg-mistica-background-overlay" />
            <div
                className={cn(
                    'relative flex size-full flex-col gap-3 px-4 py-8 lg:px-12 lg:py-14',
                    centered ? 'items-center justify-center text-center' : 'justify-end'
                )}
                style={{minHeight}}
            >
                {headline ? <div>{headline}</div> : null}
                {pretitle ? (
                    <Text preset="text2" weight="medium" className="text-mistica-text-secondary-inverse">
                        {pretitle}
                    </Text>
                ) : null}
                <Text as="h1" preset="text7" color="inverse">
                    {title}
                </Text>
                {description ? (
                    <Text preset="text3" className="max-w-xl text-mistica-text-secondary-inverse">
                        {description}
                    </Text>
                ) : null}
                {actions ? <div className={cn('mt-3 flex flex-wrap gap-3', centered && 'justify-center')}>{actions}</div> : null}
            </div>
        </section>
    );
}

export {CoverHero};
