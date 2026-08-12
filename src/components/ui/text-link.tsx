import * as React from 'react';

import {cn} from '@/lib/utils';

/**
 * TextLink Mistica: link de texto inline (textLink, peso medium,
 * sublinhado no hover). Renderiza <a> com href ou <button> com onPress.
 */
type TextLinkProps = {
    href?: string;
    /** Abre em nova aba (adiciona rel seguro). */
    newTab?: boolean;
    onPress?: () => void;
    /** Herda o tamanho do texto ao redor por padrao. */
    small?: boolean;
    underline?: 'hover' | 'always' | 'none';
    children: React.ReactNode;
    className?: string;
};

function TextLink({href, newTab, onPress, small, underline = 'hover', children, className}: TextLinkProps) {
    const classes = cn(
        'inline cursor-pointer rounded-sm font-medium text-mistica-text-link outline-none focus-visible:ring-2 focus-visible:ring-mistica-control-activated',
        underline === 'hover' && 'hover:underline',
        underline === 'always' && 'underline',
        small && 'text-sm',
        className
    );

    if (href) {
        return (
            <a
                data-slot="text-link"
                href={href}
                target={newTab ? '_blank' : undefined}
                rel={newTab ? 'noopener noreferrer' : undefined}
                onClick={onPress}
                className={classes}
            >
                {children}
            </a>
        );
    }
    return (
        <button data-slot="text-link" type="button" onClick={onPress} className={classes}>
            {children}
        </button>
    );
}

export {TextLink};
