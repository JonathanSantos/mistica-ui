import * as React from 'react';

/**
 * ThemeVariant Mistica: dentro de "inverse" (fundos brand), botoes e links
 * automaticamente usam os tokens inversos — como no Mistica original.
 * Funciona redefinindo as CSS vars que os componentes consomem.
 */
const VARS_INVERSAS: React.CSSProperties = {
    '--mistica-button-primary-background': 'var(--mistica-button-primary-background-inverse)',
    '--mistica-button-primary-background-hover': 'var(--mistica-button-primary-background-inverse-hover)',
    '--mistica-button-primary-background-pressed': 'var(--mistica-button-primary-background-inverse-pressed)',
    '--mistica-text-button-primary': 'var(--mistica-text-button-primary-inverse)',
    '--mistica-button-secondary-border': 'var(--mistica-button-secondary-border-inverse)',
    '--mistica-button-secondary-border-pressed': 'var(--mistica-button-secondary-border-inverse-pressed)',
    '--mistica-text-button-secondary': 'var(--mistica-text-button-secondary-inverse)',
    '--mistica-text-button-secondary-pressed': 'var(--mistica-text-button-secondary-inverse-pressed)',
    '--mistica-button-secondary-background-hover': 'var(--mistica-button-secondary-background-inverse-hover)',
    '--mistica-button-secondary-background-pressed': 'var(--mistica-button-secondary-background-inverse-pressed)',
    '--mistica-text-link': 'var(--mistica-text-link-inverse)',
    '--mistica-button-link-background-pressed': 'var(--mistica-button-link-background-inverse-pressed)',
    '--mistica-text-primary': 'var(--mistica-text-primary-inverse)',
    '--mistica-text-secondary': 'var(--mistica-text-secondary-inverse)',
    '--mistica-control-activated': 'var(--mistica-control-activated-inverse)',
    '--mistica-control': 'var(--mistica-control-inverse)',
} as React.CSSProperties;

type ThemeVariantProps = {
    variant: 'inverse' | 'default';
    children: React.ReactNode;
    className?: string;
};

function ThemeVariant({variant, children, className}: ThemeVariantProps) {
    return (
        <div
            data-slot="theme-variant"
            data-theme-variant={variant}
            className={className}
            style={variant === 'inverse' ? VARS_INVERSAS : undefined}
        >
            {children}
        </div>
    );
}

export {ThemeVariant};
