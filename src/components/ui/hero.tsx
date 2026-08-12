import * as React from 'react';

import {cn} from '@/lib/utils';
import {Text} from '@/components/ui/text';

/**
 * Hero Mistica: bloco de destaque com padding de hero do skin (24/56),
 * texto + midia em duas colunas no desktop. Fundos: default, alternative, brand.
 */
type HeroProps = {
    pretitle?: string;
    title: string;
    description?: string;
    actions?: React.ReactNode;
    /** Imagem ou qualquer midia a direita. */
    media?: React.ReactNode;
    background?: 'default' | 'alternative' | 'brand';
    className?: string;
};

function Hero({pretitle, title, description, actions, media, background = 'default', className}: HeroProps) {
    const inverse = background === 'brand';

    return (
        <section
            data-slot="hero"
            className={cn(
                'px-4 py-6 lg:px-12 lg:py-14',
                background === 'brand' && 'bg-mistica-background-brand',
                background === 'alternative' && 'bg-mistica-background-alternative',
                background === 'default' && 'bg-mistica-background',
                className
            )}
        >
            <div className={cn('mx-auto grid max-w-4xl items-center gap-8', media && 'lg:grid-cols-2')}>
                <div className="grid gap-3">
                    {pretitle ? (
                        <Text
                            preset="text2"
                            weight="medium"
                            className={inverse ? 'text-mistica-text-secondary-inverse' : 'text-mistica-text-activated'}
                        >
                            {pretitle}
                        </Text>
                    ) : null}
                    <Text as="h1" preset="text7" color={inverse ? 'inverse' : 'primary'}>
                        {title}
                    </Text>
                    {description ? (
                        <Text
                            preset="text3"
                            className={inverse ? 'text-mistica-text-secondary-inverse' : 'text-mistica-text-secondary'}
                        >
                            {description}
                        </Text>
                    ) : null}
                    {actions ? <div className="mt-3 flex flex-wrap gap-3">{actions}</div> : null}
                </div>
                {media ? <div className="min-w-0">{media}</div> : null}
            </div>
        </section>
    );
}

export {Hero};
