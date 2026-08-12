import * as React from 'react';
import {cva, type VariantProps} from 'class-variance-authority';

import {cn} from '@/lib/utils';

/**
 * IconButton Mistica: circular, com as variantes de fundo do design system.
 * aria-label e obrigatorio (o conteudo e so o icone).
 */
const iconButtonVariants = cva(
    'inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors duration-100 outline-none focus-visible:ring-2 focus-visible:ring-mistica-control-activated focus-visible:ring-offset-2 focus-visible:ring-offset-mistica-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0',
    {
        variants: {
            variant: {
                transparent:
                    'bg-transparent text-mistica-neutral-high hover:bg-mistica-background-container-hover active:bg-mistica-background-container-pressed',
                soft: 'bg-mistica-brand-low text-mistica-control-activated hover:opacity-90 active:opacity-80',
                solid: 'bg-mistica-button-primary-background text-mistica-text-button-primary hover:bg-mistica-button-primary-background-hover active:bg-mistica-button-primary-background-pressed',
            },
            size: {
                default: 'size-(--mistica-size-icon-button) [&_svg]:size-6',
                small: 'size-(--mistica-size-icon-button-small) [&_svg]:size-5',
            },
        },
        defaultVariants: {
            variant: 'transparent',
            size: 'default',
        },
    }
);

function IconButton({
    className,
    variant,
    size,
    'aria-label': ariaLabel,
    ...props
}: React.ComponentProps<'button'> &
    VariantProps<typeof iconButtonVariants> & {'aria-label': string}) {
    return (
        <button
            type="button"
            data-slot="icon-button"
            aria-label={ariaLabel}
            className={cn(iconButtonVariants({variant, size, className}))}
            {...props}
        />
    );
}

export {IconButton};
