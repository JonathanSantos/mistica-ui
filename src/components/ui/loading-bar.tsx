
import {cn} from '@/lib/utils';

/**
 * LoadingBar Mistica: barra indeterminada de 4px no topo da tela
 * (tokens loadingBar / loadingBarBackground).
 */
type LoadingBarProps = {
    visible?: boolean;
    /** false: renderiza no fluxo (util para demos); padrao fixa no topo da pagina. */
    fixed?: boolean;
    className?: string;
};

function LoadingBar({visible = true, fixed = true, className}: LoadingBarProps) {
    if (!visible) {
        return null;
    }

    return (
        <div
            data-slot="loading-bar"
            role="progressbar"
            aria-label="Carregando"
            className={cn(
                'relative h-1 w-full overflow-hidden bg-mistica-loading-bar-background',
                fixed && 'fixed inset-x-0 top-0 z-50',
                className
            )}
        >
            <div className="absolute inset-y-0 animate-loading-bar rounded-mistica-bar bg-mistica-loading-bar" />
        </div>
    );
}

export {LoadingBar};
