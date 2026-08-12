import * as React from 'react';
import {cva} from 'class-variance-authority';

import {cn} from '@/lib/utils';

/**
 * IconButton com a API do Mistica original: Icon, aria-label, onPress,
 * type (cor do icone), backgroundType e small.
 */
const iconButtonVariants = cva(
    'inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors duration-100 outline-none focus-visible:ring-2 focus-visible:ring-mistica-control-activated focus-visible:ring-offset-2 focus-visible:ring-offset-mistica-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0',
    {
        variants: {
            backgroundType: {
                transparent: 'bg-transparent hover:bg-mistica-background-container-hover active:bg-mistica-background-container-pressed',
                soft: 'bg-mistica-brand-low hover:opacity-90 active:opacity-80',
                solid: 'bg-mistica-button-primary-background hover:bg-mistica-button-primary-background-hover active:bg-mistica-button-primary-background-pressed',
            },
            small: {
                false: 'size-(--mistica-size-icon-button) [&_svg]:size-6',
                true: 'size-(--mistica-size-icon-button-small) [&_svg]:size-5',
            },
        },
        defaultVariants: {
            backgroundType: 'transparent',
            small: false,
        },
    }
);

type IconButtonProps = {
    Icon: React.ComponentType<{className?: string}>;
    'aria-label': string;
    onPress?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    /** Cor do icone: neutral (padrao), brand (controlActivated) ou danger. */
    type?: 'neutral' | 'brand' | 'danger';
    backgroundType?: 'transparent' | 'soft' | 'solid';
    small?: boolean;
    disabled?: boolean;
    className?: string;
    tabIndex?: number;
};

function IconButton({
    Icon,
    'aria-label': ariaLabel,
    onPress,
    type = 'neutral',
    backgroundType = 'transparent',
    small = false,
    disabled,
    className,
    tabIndex,
}: IconButtonProps) {
    const corIcone =
        backgroundType === 'solid'
            ? 'text-mistica-text-button-primary'
            : type === 'brand' || backgroundType === 'soft'
              ? 'text-mistica-control-activated'
              : type === 'danger'
                ? 'text-mistica-error-high'
                : 'text-mistica-neutral-high';

    return (
        <button
            type="button"
            data-slot="icon-button"
            aria-label={ariaLabel}
            onClick={onPress}
            disabled={disabled}
            tabIndex={tabIndex}
            className={cn(iconButtonVariants({backgroundType, small}), corIcone, className)}
        >
            <Icon aria-hidden />
        </button>
    );
}

export {IconButton};
