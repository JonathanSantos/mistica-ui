import * as React from 'react';

import {cn} from '@/lib/utils';

/**
 * Primitivos de layout do Mistica (Box, Stack, Inline, Grid, ResponsiveLayout)
 * em estilo shadcn: wrappers finos sobre flex/grid com `className` sempre
 * disponivel para composicao Tailwind, `as` polimorfico e espacos em px.
 */

type AsProp = {as?: React.ElementType; className?: string; children?: React.ReactNode};

/** Box: padding em px (como o Box do Mistica), sem opiniao de layout. */
type BoxProps = AsProp & {
    padding?: number;
    paddingX?: number;
    paddingY?: number;
    paddingTop?: number;
    paddingBottom?: number;
    paddingLeft?: number;
    paddingRight?: number;
} & Omit<React.HTMLAttributes<HTMLElement>, 'className' | 'children'>;

function Box({
    as: Comp = 'div',
    padding,
    paddingX,
    paddingY,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    className,
    style,
    ...props
}: BoxProps & {style?: React.CSSProperties}) {
    return (
        <Comp
            data-slot="box"
            className={className}
            style={{
                paddingTop: paddingTop ?? paddingY ?? padding,
                paddingBottom: paddingBottom ?? paddingY ?? padding,
                paddingLeft: paddingLeft ?? paddingX ?? padding,
                paddingRight: paddingRight ?? paddingX ?? padding,
                ...style,
            }}
            {...props}
        />
    );
}

/** Stack: pilha vertical com espaco entre filhos (gap em px). */
type StackProps = AsProp & {
    space?: number;
    align?: 'start' | 'center' | 'end' | 'stretch';
} & Omit<React.HTMLAttributes<HTMLElement>, 'className' | 'children'>;

const ALIGN_ITEMS = {start: 'items-start', center: 'items-center', end: 'items-end', stretch: 'items-stretch'};

function Stack({as: Comp = 'div', space = 16, align = 'stretch', className, style, ...props}: StackProps & {style?: React.CSSProperties}) {
    return (
        <Comp
            data-slot="stack"
            className={cn('flex flex-col', ALIGN_ITEMS[align], className)}
            style={{gap: space, ...style}}
            {...props}
        />
    );
}

/** Inline: linha horizontal com espaco entre filhos; quebra por padrao. */
type InlineProps = AsProp & {
    space?: number;
    alignItems?: 'start' | 'center' | 'end' | 'stretch';
    justify?: 'start' | 'center' | 'end' | 'between';
    wrap?: boolean;
} & Omit<React.HTMLAttributes<HTMLElement>, 'className' | 'children'>;

const JUSTIFY = {start: 'justify-start', center: 'justify-center', end: 'justify-end', between: 'justify-between'};

function Inline({
    as: Comp = 'div',
    space = 8,
    alignItems = 'center',
    justify = 'start',
    wrap = true,
    className,
    style,
    ...props
}: InlineProps & {style?: React.CSSProperties}) {
    return (
        <Comp
            data-slot="inline"
            className={cn('flex flex-row', ALIGN_ITEMS[alignItems], JUSTIFY[justify], wrap && 'flex-wrap', className)}
            style={{gap: space, ...style}}
            {...props}
        />
    );
}

/**
 * Grid: colunas fixas (`columns`, 1 no mobile por padrao) ou fluidas
 * (`minColumnWidth` -> auto-fill). gap em px.
 */
type GridProps = AsProp & {
    columns?: number;
    /** Largura minima por coluna (px); ignora `columns` e usa auto-fill. */
    minColumnWidth?: number;
    gap?: number;
    /** false: usa `columns` ja no mobile (padrao: 1 coluna ate 1024px). */
    collapseOnMobile?: boolean;
} & Omit<React.HTMLAttributes<HTMLElement>, 'className' | 'children'>;

function Grid({
    as: Comp = 'div',
    columns = 2,
    minColumnWidth,
    gap = 16,
    collapseOnMobile = true,
    className,
    style,
    ...props
}: GridProps & {style?: React.CSSProperties}) {
    const gridStyle: React.CSSProperties = minColumnWidth
        ? {gridTemplateColumns: `repeat(auto-fill, minmax(${minColumnWidth}px, 1fr))`}
        : collapseOnMobile
          ? {'--grid-cols': columns} as React.CSSProperties
          : {gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`};

    return (
        <Comp
            data-slot="grid"
            className={cn(
                'grid',
                !minColumnWidth && collapseOnMobile && 'grid-cols-1 lg:grid-cols-[repeat(var(--grid-cols),minmax(0,1fr))]',
                className
            )}
            style={{gap, ...gridStyle, ...style}}
            {...props}
        />
    );
}

/**
 * ResponsiveLayout: container central do Mistica — largura maxima de 1224px
 * e margens laterais do token responsiveLayoutMargin (16px mobile / 48px
 * desktop; 24px no skin vivo-new-system).
 */
type ResponsiveLayoutProps = AsProp & {
    /** Remove a largura maxima (mantem so as margens). */
    fullWidth?: boolean;
} & Omit<React.HTMLAttributes<HTMLElement>, 'className' | 'children'>;

function ResponsiveLayout({as: Comp = 'div', fullWidth = false, className, ...props}: ResponsiveLayoutProps) {
    return (
        <Comp
            data-slot="responsive-layout"
            className={cn(
                'mx-auto w-full px-(--mistica-responsive-layout-margin)',
                !fullWidth && 'max-w-[1224px]',
                className
            )}
            {...props}
        />
    );
}

export {Box, Stack, Inline, Grid, ResponsiveLayout};
