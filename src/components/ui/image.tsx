import * as React from 'react';

import {cn} from '@/lib/utils';

/**
 * Image / Video Mistica: midia com aspect ratio e radius do skin
 * (mediaSmall por padrao), com fundo skeleton enquanto carrega.
 */
type AspectRatio = '1:1' | '16:9' | '4:3' | '7:10' | 'auto';

const RATIOS: Record<Exclude<AspectRatio, 'auto'>, string> = {
    '1:1': '1/1',
    '16:9': '16/9',
    '4:3': '4/3',
    '7:10': '7/10',
};

type ImageProps = Omit<React.ComponentProps<'img'>, 'alt'> & {
    alt?: string;
    aspectRatio?: AspectRatio;
    /** true: radius de container (24px) em vez de mediaSmall (12px). */
    roundedContainer?: boolean;
    /** Remove o radius (ex.: dentro de um card que ja recorta). */
    noBorderRadius?: boolean;
};

function Image({
    className,
    alt = '',
    aspectRatio = 'auto',
    roundedContainer = false,
    noBorderRadius = false,
    style,
    ...props
}: ImageProps) {
    return (
        <img
            data-slot="image"
            alt={alt}
            className={cn(
                'w-full bg-mistica-background-skeleton object-cover',
                !noBorderRadius && (roundedContainer ? 'rounded-mistica-container' : 'rounded-mistica-media-small'),
                className
            )}
            style={{
                ...(aspectRatio !== 'auto' && {aspectRatio: RATIOS[aspectRatio]}),
                ...style,
            }}
            {...props}
        />
    );
}

type VideoProps = React.ComponentProps<'video'> & {
    aspectRatio?: AspectRatio;
    roundedContainer?: boolean;
    noBorderRadius?: boolean;
};

function Video({
    className,
    aspectRatio = '16:9',
    roundedContainer = false,
    noBorderRadius = false,
    autoPlay = true,
    style,
    ...props
}: VideoProps) {
    return (
        <video
            data-slot="video"
            autoPlay={autoPlay}
            muted={autoPlay ? true : props.muted}
            loop
            playsInline
            className={cn(
                'w-full bg-mistica-background-skeleton object-cover',
                !noBorderRadius && (roundedContainer ? 'rounded-mistica-container' : 'rounded-mistica-media-small'),
                className
            )}
            style={{
                ...(aspectRatio !== 'auto' && {aspectRatio: RATIOS[aspectRatio]}),
                ...style,
            }}
            {...props}
        />
    );
}

export {Image, Video};
