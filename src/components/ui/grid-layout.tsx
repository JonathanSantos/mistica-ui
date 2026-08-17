import * as React from 'react';

import {cn} from '@/lib/utils';

/**
 * GridLayout Mistica: grid de 12 colunas (gutter de 24px no desktop, 16px
 * abaixo) com templates prontos que definem os spans e as colunas
 * espacadoras. Abaixo do breakpoint de colapso vira coluna unica e
 * `verticalSpace` passa a ser o espaco vertical (row-gap) entre as areas;
 * `collapseBreakpoint='tablet'` (padrao) colapsa em tablet e mobile,
 * `'mobile'` colapsa apenas no mobile.
 */

export type VerticalSpace = 0 | 2 | 4 | 8 | 12 | 16 | 24 | 32 | 40 | 48 | 56 | 64 | 72 | 80;

type DataAttributes = {
    [name: string]: string | number | boolean | undefined;
    testid?: string;
};

/** Uniao exclusiva (como no Mistica): usar props de um membro proibe as dos demais. */
type AllKeys<T> = T extends unknown ? keyof T : never;
type Id<T> = T extends infer U ? {[K in keyof U]: U[K]} : never;
type ExclusifyUnion<T, K extends PropertyKey = AllKeys<T>> = T extends unknown
    ? Id<T & Partial<Record<Exclude<K, keyof T>, never>>>
    : never;

type CommonProps = {
    verticalSpace?: VerticalSpace;
    collapseBreakpoint?: 'tablet' | 'mobile';
    dataAttributes?: DataAttributes;
};

type PropsChildren = {children: React.ReactNode};
type PropsTemplate6plus6 = {template: '6+6'; left: React.ReactNode; right: React.ReactNode};
type PropsTemplate8plus4 = {template: '8+4'; left: React.ReactNode; right: React.ReactNode};
type PropsTemplate4plus6 = {template: '4+6'; left: React.ReactNode; right: React.ReactNode};
type PropsTemplate5plus4 = {template: '5+4'; left: React.ReactNode; right: React.ReactNode};
type PropsTemplate3plus9 = {template: '3+9'; left: React.ReactNode; right: React.ReactNode};
type PropsTemplate10 = {template: '10'; children: React.ReactNode};
type PropsTemplate8 = {template: '8'; children: React.ReactNode};

type GridLayoutProps = CommonProps &
    ExclusifyUnion<
        | PropsChildren
        | PropsTemplate6plus6
        | PropsTemplate8plus4
        | PropsTemplate4plus6
        | PropsTemplate5plus4
        | PropsTemplate3plus9
        | PropsTemplate10
        | PropsTemplate8
    >;

function GridLayout({
    verticalSpace,
    collapseBreakpoint = 'tablet',
    dataAttributes,
    template,
    left,
    right,
    children,
}: GridLayoutProps) {
    // 'tablet' (padrao): so e grid no desktop (lg); 'mobile': ja e grid no tablet (md).
    const desktopOnly = collapseBreakpoint === 'tablet';

    // Como no Mistica: data-testid="GridLayout" por padrao e cada chave de
    // dataAttributes vira um atributo data-*.
    const dataProps: Record<string, string | number | boolean | undefined> = {
        'data-testid': 'GridLayout',
    };
    if (dataAttributes) {
        for (const [name, value] of Object.entries(dataAttributes)) {
            dataProps[`data-${name}`] = value;
        }
    }

    const container = {
        'data-slot': 'grid-layout',
        className: cn(
            'grid grid-cols-[minmax(0,1fr)] gap-x-4 gap-y-[var(--mistica-grid-vertical-space,0px)] lg:gap-x-6',
            desktopOnly
                ? 'lg:grid-cols-[repeat(12,1fr)] lg:gap-y-0'
                : 'md:grid-cols-[repeat(12,1fr)] md:gap-y-0'
        ),
        style:
            verticalSpace !== undefined
                ? ({'--mistica-grid-vertical-space': `${verticalSpace}px`} as React.CSSProperties)
                : undefined,
        ...dataProps,
    };

    const spanClassName = desktopOnly
        ? 'lg:col-[span_var(--mistica-grid-col-span)]'
        : 'md:col-[span_var(--mistica-grid-col-span)]';

    const cell = (span: number, content: React.ReactNode) => (
        <div className={spanClassName} style={{'--mistica-grid-col-span': String(span)} as React.CSSProperties}>
            {content}
        </div>
    );

    // Coluna espacadora dos templates; colapsado ela some (nao ocupa espaco).
    const spacer = (span: number) => (
        <div
            className={cn('hidden', desktopOnly ? 'lg:block' : 'md:block', spanClassName)}
            style={{'--mistica-grid-col-span': String(span)} as React.CSSProperties}
        />
    );

    if (template === '6+6') {
        return (
            <div {...container}>
                {cell(6, left)}
                {cell(6, right)}
            </div>
        );
    }
    if (template === '8+4') {
        return (
            <div {...container}>
                {cell(8, left)}
                {cell(4, right)}
            </div>
        );
    }
    if (template === '4+6') {
        return (
            <div {...container}>
                {cell(4, left)}
                {spacer(1)}
                {cell(6, right)}
                {spacer(1)}
            </div>
        );
    }
    if (template === '5+4') {
        return (
            <div {...container}>
                {spacer(1)}
                {cell(5, left)}
                {spacer(1)}
                {cell(4, right)}
                {spacer(1)}
            </div>
        );
    }
    if (template === '3+9') {
        return (
            <div {...container}>
                {cell(3, left)}
                {cell(9, right)}
            </div>
        );
    }
    if (template === '10') {
        return (
            <div {...container}>
                {spacer(1)}
                {cell(10, children)}
                {spacer(1)}
            </div>
        );
    }
    if (template === '8') {
        return (
            <div {...container}>
                {spacer(2)}
                {cell(8, children)}
                {spacer(2)}
            </div>
        );
    }
    return <div {...container}>{children}</div>;
}

export {GridLayout};
export type {GridLayoutProps};
