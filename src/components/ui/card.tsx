import * as React from 'react';

import {cn} from '@/lib/utils';
import {Text} from '@/components/ui/text';

/**
 * Cards Mistica: DataCard, MediaCard, SnapCard e PosterCard.
 * Todos usam radius de container (24px), padding de card do skin
 * (16px mobile / 24px desktop) e borda boxed (showBoxedBorder=true no vivo).
 */

type CardShellProps = React.ComponentProps<'div'> & {
    onPress?: () => void;
};

/** Container boxed comum; clicavel quando recebe onPress. */
function CardShell({className, onPress, children, ...props}: CardShellProps) {
    const classes = cn(
        'relative flex flex-col overflow-hidden rounded-mistica-container border border-mistica-border bg-mistica-background-container text-left',
        onPress &&
            'cursor-pointer transition-colors outline-none hover:bg-mistica-background-container-hover active:bg-mistica-background-container-pressed focus-visible:ring-2 focus-visible:ring-mistica-control-activated',
        className
    );

    if (onPress) {
        return (
            <button type="button" data-slot="card" onClick={onPress} className={classes}>
                {children}
            </button>
        );
    }
    return (
        <div data-slot="card" className={classes} {...props}>
            {children}
        </div>
    );
}

type CardContentProps = {
    /** Ex.: <Tag type="promo">Novidade</Tag> */
    headline?: React.ReactNode;
    pretitle?: string;
    title?: string;
    subtitle?: string;
    description?: string;
};

function CardContent({headline, pretitle, title, subtitle, description}: CardContentProps) {
    return (
        <div className="grid gap-1">
            {headline ? <div className="mb-1">{headline}</div> : null}
            {pretitle ? (
                <Text as="div" preset="card-pretitle-default" className="text-mistica-text-primary">
                    {pretitle}
                </Text>
            ) : null}
            {title ? (
                <Text as="h3" preset="card-title-default" weight="medium">
                    {title}
                </Text>
            ) : null}
            {subtitle ? (
                <Text as="div" preset="card-subtitle-default" color="secondary">
                    {subtitle}
                </Text>
            ) : null}
            {description ? (
                <Text as="div" preset="card-description-default" color="secondary" className="mt-1">
                    {description}
                </Text>
            ) : null}
        </div>
    );
}

type DataCardProps = CardContentProps & {
    Icon?: React.ComponentType<{className?: string}>;
    actions?: React.ReactNode;
    onPress?: () => void;
    className?: string;
};

/** DataCard: icone no topo + conteudo + acoes. */
function DataCard({Icon, actions, onPress, className, ...content}: DataCardProps) {
    return (
        <CardShell onPress={onPress} className={className}>
            <div className="flex flex-1 flex-col gap-4 p-(--mistica-card-padding)">
                {Icon ? <Icon className="size-10 text-mistica-control-activated" aria-hidden /> : null}
                <CardContent {...content} />
                {actions ? <div className="mt-auto flex flex-wrap gap-3 pt-2">{actions}</div> : null}
            </div>
        </CardShell>
    );
}

type MediaCardProps = CardContentProps & {
    src: string;
    alt?: string;
    /** aspect ratio da midia; padrao 16/9 */
    aspectRatio?: string;
    actions?: React.ReactNode;
    onPress?: () => void;
    className?: string;
};

/** MediaCard: imagem no topo + conteudo + acoes. */
function MediaCard({src, alt = '', aspectRatio = '16/9', actions, onPress, className, ...content}: MediaCardProps) {
    return (
        <CardShell onPress={onPress} className={className}>
            <img src={src} alt={alt} className="w-full object-cover" style={{aspectRatio}} />
            <div className="flex flex-1 flex-col gap-4 p-(--mistica-card-padding)">
                <CardContent {...content} />
                {actions ? <div className="mt-auto flex flex-wrap gap-3 pt-2">{actions}</div> : null}
            </div>
        </CardShell>
    );
}

type SnapCardProps = {
    Icon?: React.ComponentType<{className?: string}>;
    title?: string;
    subtitle?: string;
    onPress?: () => void;
    className?: string;
};

/** SnapCard: card compacto de icone + titulo + subtitulo. */
function SnapCard({Icon, title, subtitle, onPress, className}: SnapCardProps) {
    return (
        <CardShell onPress={onPress} className={className}>
            <div className="grid gap-3 p-(--mistica-card-padding)">
                {Icon ? <Icon className="size-8 text-mistica-control-activated" aria-hidden /> : null}
                <div className="grid gap-0.5">
                    {title ? (
                        <Text as="div" preset="card-title-snap" weight="medium">
                            {title}
                        </Text>
                    ) : null}
                    {subtitle ? (
                        <Text as="div" preset="card-subtitle-snap" color="secondary">
                            {subtitle}
                        </Text>
                    ) : null}
                </div>
            </div>
        </CardShell>
    );
}

type PosterCardProps = {
    src: string;
    alt?: string;
    headline?: React.ReactNode;
    pretitle?: string;
    title?: string;
    description?: string;
    /** aspect ratio; padrao 7/10 como no Mistica */
    aspectRatio?: string;
    onPress?: () => void;
    className?: string;
};

/** PosterCard: imagem de fundo com overlay gradiente (cardContentOverlay) e texto inverso. */
function PosterCard({
    src,
    alt = '',
    headline,
    pretitle,
    title,
    description,
    aspectRatio = '7/10',
    onPress,
    className,
}: PosterCardProps) {
    return (
        <CardShell onPress={onPress} className={cn('border-none', className)}>
            <img src={src} alt={alt} className="absolute inset-0 size-full object-cover" />
            <div
                aria-hidden
                className="absolute inset-0"
                style={{background: 'var(--mistica-card-content-overlay)'}}
            />
            <div className="relative flex flex-col justify-end gap-1 p-(--mistica-card-padding)" style={{aspectRatio}}>
                {headline ? <div className="mb-1">{headline}</div> : null}
                {pretitle ? (
                    <Text as="div" preset="card-pretitle-default" color="inverse">
                        {pretitle}
                    </Text>
                ) : null}
                {title ? (
                    <Text as="h3" preset="card-title-default" weight="medium" color="inverse">
                        {title}
                    </Text>
                ) : null}
                {description ? (
                    <Text as="div" preset="card-description-default" className="text-mistica-text-secondary-inverse">
                        {description}
                    </Text>
                ) : null}
            </div>
        </CardShell>
    );
}

type DisplayDataCardProps = {
    Icon?: React.ComponentType<{className?: string}>;
    headline?: React.ReactNode;
    pretitle?: string;
    title: string;
    description?: string;
    /** Botao/acao no rodape. */
    actions?: React.ReactNode;
    onPress?: () => void;
    className?: string;
};

/** DisplayDataCard: card de destaque com titulo grande (text6) e padding generoso. */
function DisplayDataCard({Icon, headline, pretitle, title, description, actions, onPress, className}: DisplayDataCardProps) {
    return (
        <CardShell onPress={onPress} className={className}>
            <div className="flex flex-1 flex-col gap-6 p-(--mistica-card-padding)">
                {Icon ? <Icon className="size-12 text-mistica-control-activated" aria-hidden /> : null}
                <div className="mt-auto grid gap-2 pt-8">
                    {headline ? <div>{headline}</div> : null}
                    {pretitle ? (
                        <Text as="div" preset="text2" className="text-mistica-text-primary">
                            {pretitle}
                        </Text>
                    ) : null}
                    <Text as="h3" preset="text6">
                        {title}
                    </Text>
                    {description ? (
                        <Text as="div" preset="text2" color="secondary">
                            {description}
                        </Text>
                    ) : null}
                </div>
                {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
            </div>
        </CardShell>
    );
}

type DisplayMediaCardProps = PosterCardProps & {
    description?: string;
    actions?: React.ReactNode;
};

/** DisplayMediaCard: PosterCard com descricao e acoes no rodape. */
function DisplayMediaCard({
    src,
    alt = '',
    headline,
    pretitle,
    title,
    description,
    actions,
    aspectRatio = '7/10',
    onPress,
    className,
}: DisplayMediaCardProps) {
    return (
        <CardShell onPress={onPress} className={cn('border-none', className)}>
            <img src={src} alt={alt} className="absolute inset-0 size-full object-cover" />
            <div aria-hidden className="absolute inset-0" style={{background: 'var(--mistica-card-content-overlay)'}} />
            <div className="relative flex flex-col justify-end gap-1 p-(--mistica-card-padding)" style={{aspectRatio}}>
                {headline ? <div className="mb-1">{headline}</div> : null}
                {pretitle ? (
                    <Text as="div" preset="card-pretitle-default" color="inverse">
                        {pretitle}
                    </Text>
                ) : null}
                {title ? (
                    <Text as="h3" preset="card-title-default" weight="medium" color="inverse">
                        {title}
                    </Text>
                ) : null}
                {description ? (
                    <Text as="div" preset="card-description-default" className="text-mistica-text-secondary-inverse">
                        {description}
                    </Text>
                ) : null}
                {actions ? <div className="mt-3 flex flex-wrap gap-3">{actions}</div> : null}
            </div>
        </CardShell>
    );
}

type NakedCardProps = CardContentProps & {
    src: string;
    alt?: string;
    aspectRatio?: string;
    onPress?: () => void;
    className?: string;
};

/** NakedCard: midia + conteudo sem caixa (sem borda/fundo). */
function NakedCard({src, alt = '', aspectRatio = '16/9', onPress, className, ...content}: NakedCardProps) {
    const inner = (
        <>
            <img
                src={src}
                alt={alt}
                className="w-full rounded-mistica-media-small object-cover"
                style={{aspectRatio}}
            />
            <div className="pt-3">
                <CardContent {...content} />
            </div>
        </>
    );

    if (onPress) {
        return (
            <button
                type="button"
                data-slot="card"
                onClick={onPress}
                className={cn(
                    'block w-full cursor-pointer rounded-mistica-media-small text-left outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-mistica-control-activated focus-visible:ring-offset-2 focus-visible:ring-offset-mistica-background',
                    className
                )}
            >
                {inner}
            </button>
        );
    }
    return (
        <div data-slot="card" className={className}>
            {inner}
        </div>
    );
}

/** CoverCard Mistica: card de capa — DisplayMediaCard em formato paisagem. */
function CoverCard(props: DisplayMediaCardProps) {
    return <DisplayMediaCard aspectRatio="16/9" {...props} />;
}

export {DataCard, MediaCard, SnapCard, PosterCard, DisplayDataCard, DisplayMediaCard, NakedCard, CoverCard};
