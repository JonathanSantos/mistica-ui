import * as React from 'react';
import {cva, type VariantProps} from 'class-variance-authority';

import {cn} from '@/lib/utils';

/**
 * Tag Mistica: mesmos tipos semanticos do design system
 * (promo, active, inactive, success, warning, error, info),
 * com os pares de tokens tagBackground* / tagText* do skin vivo.
 */
const tagVariants = cva(
    'inline-flex h-(--mistica-height-tag) min-w-0 max-w-full items-center gap-1 rounded-mistica-tag px-3 text-sm font-medium leading-5 [&_svg]:size-4 [&_svg]:shrink-0',
    {
        variants: {
            type: {
                promo: 'bg-mistica-tag-background-promo text-mistica-tag-text-promo',
                active: 'bg-mistica-tag-background-active text-mistica-tag-text-active',
                inactive: 'bg-mistica-tag-background-inactive text-mistica-tag-text-inactive',
                success: 'bg-mistica-tag-background-success text-mistica-tag-text-success',
                warning: 'bg-mistica-tag-background-warning text-mistica-tag-text-warning',
                error: 'bg-mistica-tag-background-error text-mistica-tag-text-error',
                info: 'bg-mistica-tag-background-info text-mistica-tag-text-info',
            },
        },
        defaultVariants: {
            type: 'promo',
        },
    }
);

function Tag({
    className,
    type,
    Icon,
    children,
    ...props
}: React.ComponentProps<'span'> &
    VariantProps<typeof tagVariants> & {
        Icon?: React.ComponentType<{className?: string}>;
    }) {
    return (
        <span data-slot="tag" className={cn(tagVariants({type, className}))} {...props}>
            {Icon ? <Icon aria-hidden /> : null}
            <span className="truncate">{children}</span>
        </span>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export {Tag, tagVariants};
