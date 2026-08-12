import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';

import {cn} from '@/lib/utils';
import {Badge} from '@/components/ui/badge';

/**
 * Avatar Mistica: circulo com imagem ou iniciais (fundo brandLow,
 * texto textBrand), com badge opcional no canto.
 */
type AvatarProps = React.ComponentProps<typeof AvatarPrimitive.Root> & {
    src?: string;
    alt?: string;
    /** Iniciais mostradas quando nao ha imagem. */
    initials?: string;
    size?: number;
    /** Badge numerico no canto (undefined = sem badge; 0 mostra so o ponto). */
    badge?: number;
};

function Avatar({className, src, alt = '', initials, size = 40, badge, ...props}: AvatarProps) {
    const avatar = (
        <AvatarPrimitive.Root
            data-slot="avatar"
            className={cn(
                'relative flex shrink-0 overflow-hidden rounded-mistica-avatar select-none',
                className
            )}
            style={{width: size, height: size}}
            {...props}
        >
            {src ? (
                <AvatarPrimitive.Image src={src} alt={alt} className="aspect-square size-full object-cover" />
            ) : null}
            <AvatarPrimitive.Fallback
                className="flex size-full items-center justify-center bg-mistica-brand-low font-medium text-mistica-text-brand"
                style={{fontSize: size * 0.4}}
            >
                {initials}
            </AvatarPrimitive.Fallback>
        </AvatarPrimitive.Root>
    );

    if (badge === undefined) {
        return avatar;
    }

    return <Badge value={badge > 0 ? badge : undefined}>{avatar}</Badge>;
}

export {Avatar};
