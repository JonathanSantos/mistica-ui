import * as React from 'react';

import {cn} from '@/lib/utils';

/**
 * Componente de tipografia com os text presets do Mistica.
 * Tamanho/line-height sao responsivos via CSS vars (mobile -> desktop em 1024px),
 * exatamente como os tokens do skin definem.
 */
type TextPreset =
    | 'text1'
    | 'text2'
    | 'text3'
    | 'text4'
    | 'text5'
    | 'text6'
    | 'text7'
    | 'text8'
    | 'text9'
    | 'text10'
    | 'title1'
    | 'title2'
    | 'title3'
    | 'title4'
    | 'card-title-default'
    | 'card-pretitle-default'
    | 'card-subtitle-default'
    | 'card-description-default'
    | 'card-title-snap'
    | 'card-pretitle-snap'
    | 'card-subtitle-snap'
    | 'card-description-snap'
    | 'tabs-label'
    | 'input-label'
    | 'input-value'
    | 'input-helper-text'
    | 'drawer-title'
    | 'loading-screen-title'
    | 'stepper-step-label';

type TextColor = 'primary' | 'secondary' | 'link' | 'error' | 'activated' | 'brand' | 'inverse';

const COLOR_CLASSES: Record<TextColor, string> = {
    primary: 'text-mistica-text-primary',
    secondary: 'text-mistica-text-secondary',
    link: 'text-mistica-text-link',
    error: 'text-mistica-text-error',
    activated: 'text-mistica-text-activated',
    brand: 'text-mistica-text-brand',
    inverse: 'text-mistica-text-primary-inverse',
};

const WEIGHTS = {light: '300', regular: '400', medium: '500', bold: '700'} as const;

type TextProps<T extends React.ElementType> = {
    as?: T;
    preset?: TextPreset;
    color?: TextColor;
    weight?: keyof typeof WEIGHTS;
} & Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'color'>;

function Text<T extends React.ElementType = 'p'>({
    as,
    preset = 'text2',
    color,
    weight,
    className,
    style,
    ...props
}: TextProps<T>) {
    const Comp = (as ?? 'p') as React.ElementType;
    // title1 no vivo e uppercase (estilo do Mistica para headings de secao)
    const isTitle1 = preset === 'title1';

    return (
        <Comp
            data-slot="text"
            className={cn(color && COLOR_CLASSES[color], isTitle1 && 'uppercase tracking-wide', className)}
            style={{
                fontSize: `var(--mistica-text-size-${preset})`,
                lineHeight: `var(--mistica-text-line-height-${preset})`,
                fontWeight: weight
                    ? WEIGHTS[weight]
                    : `var(--mistica-text-weight-${preset}, 400)`,
                ...style,
            }}
            {...props}
        />
    );
}

export {Text, type TextPreset};
