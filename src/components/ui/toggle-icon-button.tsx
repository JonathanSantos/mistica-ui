import * as React from 'react';

import {cn} from '@/lib/utils';
import {IconButton} from '@/components/ui/icon-button';

/**
 * ToggleIconButton com a API do Mistica original: estados descritos por
 * checkedProps/uncheckedProps ({Icon, type, backgroundType, aria-label}).
 */
type ToggleStateProps = {
    Icon: React.ComponentType<{className?: string}>;
    type?: 'neutral' | 'brand' | 'danger';
    backgroundType?: 'transparent' | 'soft' | 'solid';
    'aria-label': string;
};

type ToggleIconButtonProps = {
    checkedProps: ToggleStateProps;
    uncheckedProps: ToggleStateProps;
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?: (checked: boolean) => void;
    small?: boolean;
    disabled?: boolean;
    className?: string;
};

function ToggleIconButton({
    checkedProps,
    uncheckedProps,
    checked,
    defaultChecked = false,
    onChange,
    small,
    disabled,
    className,
}: ToggleIconButtonProps) {
    const [interno, setInterno] = React.useState(defaultChecked);
    const ligado = checked ?? interno;
    const estado = ligado ? checkedProps : uncheckedProps;

    return (
        <span data-slot="toggle-icon-button" aria-pressed={ligado} role="switch" aria-checked={ligado}>
            <IconButton
                Icon={estado.Icon}
                aria-label={estado['aria-label']}
                type={estado.type}
                backgroundType={estado.backgroundType}
                small={small}
                disabled={disabled}
                className={cn(ligado && '[&_svg]:fill-current', className)}
                onPress={() => {
                    const proximo = !ligado;
                    setInterno(proximo);
                    onChange?.(proximo);
                }}
            />
        </span>
    );
}

export {ToggleIconButton};
