
import {cn} from '@/lib/utils';

/**
 * Breadcrumbs Mistica: trilha de navegacao com separador "/",
 * itens anteriores como link e o atual em textSecondary.
 */
type BreadcrumbsProps = {
    items: Array<{title: string; href?: string; onPress?: () => void}>;
    /** Rotulo de acessibilidade da nav. */
    label?: string;
    className?: string;
};

function Breadcrumbs({items, label = 'Voce está em', className}: BreadcrumbsProps) {
    return (
        <nav data-slot="breadcrumbs" aria-label={label} className={className}>
            <ol className="flex flex-wrap items-center gap-2 text-sm">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;
                    return (
                        <li key={`${item.title}-${index}`} className="flex items-center gap-2">
                            {isLast ? (
                                <span aria-current="page" className="text-mistica-text-secondary">
                                    {item.title}
                                </span>
                            ) : (
                                <a
                                    href={item.href}
                                    onClick={item.onPress}
                                    className={cn(
                                        'cursor-pointer font-medium text-mistica-text-link outline-none hover:underline focus-visible:ring-2 focus-visible:ring-mistica-control-activated rounded-sm'
                                    )}
                                >
                                    {item.title}
                                </a>
                            )}
                            {!isLast ? (
                                <span aria-hidden className="text-mistica-text-secondary">
                                    /
                                </span>
                            ) : null}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}

export {Breadcrumbs};
