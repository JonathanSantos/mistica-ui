import {ImageIcon} from 'lucide-react';

import {cn} from '@/lib/utils';

/** Placeholder Mistica: bloco tracejado para prototipos e layouts em construcao. */
type PlaceholderProps = {
    height?: number;
    width?: number | string;
    className?: string;
};

function Placeholder({height = 120, width = '100%', className}: PlaceholderProps) {
    return (
        <div
            data-slot="placeholder"
            className={cn(
                'flex items-center justify-center rounded-mistica-media-small border-2 border-dashed border-mistica-border bg-mistica-background-alternative',
                className
            )}
            style={{height, width}}
        >
            <ImageIcon className="size-6 text-mistica-neutral-medium" aria-hidden />
        </div>
    );
}

export {Placeholder};
