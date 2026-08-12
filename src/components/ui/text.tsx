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

type TextColor =
    | 'primary'
    | 'secondary'
    | 'link'
    | 'error'
    | 'activated'
    | 'brand'
    | 'inverse'
    // nomes de token como no Mistica original
    | 'textPrimary'
    | 'textSecondary'
    | 'textLink'
    | 'textError'
    | 'textActivated'
    | 'textBrand'
    | 'textPrimaryInverse'
    | 'textSecondaryInverse';

const COLOR_CLASSES: Record<TextColor, string> = {
    primary: 'text-mistica-text-primary',
    secondary: 'text-mistica-text-secondary',
    link: 'text-mistica-text-link',
    error: 'text-mistica-text-error',
    activated: 'text-mistica-text-activated',
    brand: 'text-mistica-text-brand',
    inverse: 'text-mistica-text-primary-inverse',
    textPrimary: 'text-mistica-text-primary',
    textSecondary: 'text-mistica-text-secondary',
    textLink: 'text-mistica-text-link',
    textError: 'text-mistica-text-error',
    textActivated: 'text-mistica-text-activated',
    textBrand: 'text-mistica-text-brand',
    textPrimaryInverse: 'text-mistica-text-primary-inverse',
    textSecondaryInverse: 'text-mistica-text-secondary-inverse',
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

/**
 * Componentes nomeados como no Mistica original: Text1..Text10 e Title1..4,
 * com pesos como props booleanas (<Text2 medium>, <Text3 regular>).
 */
type NamedTextProps = {
    light?: boolean;
    regular?: boolean;
    medium?: boolean;
    bold?: boolean;
    as?: React.ElementType;
    color?: TextColor;
    className?: string;
    children?: React.ReactNode;
    id?: string;
};

function criarTextoNomeado(preset: TextPreset, asPadrao: React.ElementType = 'p') {
    return function TextoNomeado({light, regular, medium, bold, as, ...rest}: NamedTextProps) {
        const weight = bold ? 'bold' : medium ? 'medium' : regular ? 'regular' : light ? 'light' : undefined;
        return <Text preset={preset} weight={weight} as={as ?? asPadrao} {...rest} />;
    };
}

const Text1 = criarTextoNomeado('text1');
const Text2 = criarTextoNomeado('text2');
const Text3 = criarTextoNomeado('text3');
const Text4 = criarTextoNomeado('text4');
const Text5 = criarTextoNomeado('text5');
const Text6 = criarTextoNomeado('text6');
const Text7 = criarTextoNomeado('text7');
const Text8 = criarTextoNomeado('text8');
const Text9 = criarTextoNomeado('text9');
const Text10 = criarTextoNomeado('text10');
const Title1 = criarTextoNomeado('title1', 'h3');
const Title2 = criarTextoNomeado('title2', 'h3');
const Title3 = criarTextoNomeado('title3', 'h2');
const Title4 = criarTextoNomeado('title4', 'h1');

export {
    Text,
    Text1,
    Text2,
    Text3,
    Text4,
    Text5,
    Text6,
    Text7,
    Text8,
    Text9,
    Text10,
    Title1,
    Title2,
    Title3,
    Title4,
    type TextPreset,
};
