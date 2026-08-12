import * as React from 'react';

import {cn} from '@/lib/utils';

/**
 * ToggleIconButton Mistica: IconButton com estado ligado/desligado
 * (ex: favoritar). Ligado usa o fundo brandLow + controlActivated.
 */
type ToggleIconButtonProps = Omit<React.ComponentProps<'button'>, 'children'> & {
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    /** Icone quando desligado. */
    Icon: React.ComponentType<{className?: string}>;
    /** Icone quando ligado (padrao: o mesmo, preenchido pela cor). */
    CheckedIcon?: React.ComponentType<{className?: string}>;
    'aria-label': string;
    size?: 'default' | 'small';
};

function ToggleIconButton({
    checked,
    onCheckedChange,
    Icon,
    CheckedIcon,
    'aria-label': ariaLabel,
    size = 'default',
    className,
    ...props
}: ToggleIconButtonProps) {
    const Atual = checked ? (CheckedIcon ?? Icon) : Icon;

    return (
        <button
            type="button"
            data-slot="toggle-icon-button"
            aria-label={ariaLabel}
            aria-pressed={checked}
            onClick={() => onCheckedChange(!checked)}
            className={cn(
                'inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors duration-100 outline-none focus-visible:ring-2 focus-visible:ring-mistica-control-activated focus-visible:ring-offset-2 focus-visible:ring-offset-mistica-background disabled:pointer-events-none disabled:opacity-50',
                size === 'default' ? 'size-(--mistica-size-icon-button) [&_svg]:size-6' : 'size-(--mistica-size-icon-button-small) [&_svg]:size-5',
                checked
                    ? 'bg-mistica-brand-low text-mistica-control-activated [&_svg]:fill-current'
                    : 'bg-transparent text-mistica-neutral-high hover:bg-mistica-background-container-hover active:bg-mistica-background-container-pressed',
                className
            )}
            {...props}
        >
            <Atual aria-hidden />
        </button>
    );
}

export {ToggleIconButton};
