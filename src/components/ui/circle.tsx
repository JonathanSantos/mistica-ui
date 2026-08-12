import * as React from 'react';

import {cn} from '@/lib/utils';

/**
 * Circle / Square Mistica: contornos basicos para icones e midia,
 * sem o consumidor precisar saber de CSS utilitario.
 */
type ShapeProps = {
    size?: number;
    /** Cor de fundo (qualquer CSS color; padrao brandLow). */
    backgroundColor?: string;
    /** Imagem de fundo (cover). */
    backgroundImage?: string;
    children?: React.ReactNode;
    className?: string;
};

function Circle({size = 40, backgroundColor, backgroundImage, children, className}: ShapeProps) {
    return (
        <div
            data-slot="circle"
            className={cn(
                'flex shrink-0 items-center justify-center overflow-hidden rounded-full text-mistica-control-activated',
                !backgroundColor && !backgroundImage && 'bg-mistica-brand-low',
                className
            )}
            style={{
                width: size,
                height: size,
                backgroundColor,
                ...(backgroundImage && {backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center'}),
            }}
        >
            {children}
        </div>
    );
}

function Square({size = 40, backgroundColor, backgroundImage, children, className}: ShapeProps) {
    return (
        <div
            data-slot="square"
            className={cn(
                'flex shrink-0 items-center justify-center overflow-hidden rounded-mistica-media-small text-mistica-control-activated',
                !backgroundColor && !backgroundImage && 'bg-mistica-brand-low',
                className
            )}
            style={{
                width: size,
                height: size,
                backgroundColor,
                ...(backgroundImage && {backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center'}),
            }}
        >
            {children}
        </div>
    );
}

export {Circle, Square};
