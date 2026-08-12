import * as React from 'react';

import {cn} from '@/lib/utils';

/**
 * StackingGroup Mistica: itens circulares sobrepostos (avatares) com
 * contador "+N" quando ultrapassa o maximo.
 */
type StackingGroupProps = {
    children: React.ReactNode;
    /** Maximo de itens visiveis antes do "+N". */
    maxItems?: number;
    /** Tamanho do circulo do "+N" (deve casar com o size dos Avatares). */
    size?: number;
    className?: string;
};

function StackingGroup({children, maxItems = 4, size = 40, className}: StackingGroupProps) {
    const itens = React.Children.toArray(children);
    const visiveis = itens.slice(0, maxItems);
    const restantes = itens.length - visiveis.length;

    return (
        <div
            data-slot="stacking-group"
            className={cn(
                'flex items-center -space-x-2 [&>*]:rounded-full [&>*]:ring-2 [&>*]:ring-mistica-background-container',
                className
            )}
        >
            {visiveis}
            {restantes > 0 ? (
                <span
                    className="flex shrink-0 items-center justify-center rounded-full bg-mistica-brand-low font-medium text-mistica-text-brand"
                    style={{width: size, height: size, fontSize: size * 0.35}}
                >
                    +{restantes}
                </span>
            ) : null}
        </div>
    );
}

export {StackingGroup};
