import * as React from 'react';
import {ChevronLeft, ChevronRight} from 'lucide-react';

import {cn} from '@/lib/utils';
import {IconButton} from '@/components/ui/icon-button';

/**
 * Carousel Mistica: scroll horizontal com snap, setas no desktop e
 * bullets de pagina (bullet ativo alongado, como no mistica-web).
 * 1 item por pagina no mobile; `itemsPerPage` no desktop.
 */
type CarouselProps = {
    children: React.ReactNode;
    itemsPerPage?: number;
    withBullets?: boolean;
    className?: string;
};

function Carousel({children, itemsPerPage = 3, withBullets = true, className}: CarouselProps) {
    const scrollerRef = React.useRef<HTMLDivElement>(null);
    const [pages, setPages] = React.useState(1);
    const [page, setPage] = React.useState(0);

    const updatePages = React.useCallback(() => {
        const el = scrollerRef.current;
        if (!el) {
            return;
        }
        setPages(Math.max(1, Math.round(el.scrollWidth / el.clientWidth)));
        setPage(Math.round(el.scrollLeft / el.clientWidth));
    }, []);

    React.useEffect(() => {
        updatePages();
        window.addEventListener('resize', updatePages);
        return () => window.removeEventListener('resize', updatePages);
    }, [updatePages]);

    const scrollToPage = (target: number) => {
        const el = scrollerRef.current;
        if (!el) {
            return;
        }
        el.scrollTo({left: target * el.clientWidth, behavior: 'smooth'});
    };

    return (
        <div data-slot="carousel" className={cn('group/carousel relative', className)}>
            <div
                ref={scrollerRef}
                onScroll={updatePages}
                className="flex snap-x snap-mandatory items-stretch gap-4 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                style={{'--items': itemsPerPage} as React.CSSProperties}
            >
                {React.Children.map(children, (child) => (
                    <div className="flex shrink-0 basis-full snap-start lg:basis-[calc((100%-1rem*(var(--items)-1))/var(--items))] [&>*]:w-full">
                        {child}
                    </div>
                ))}
            </div>

            {page > 0 ? (
                <IconButton
                    aria-label="Anterior"
                    size="small"
                    onClick={() => scrollToPage(page - 1)}
                    className="absolute top-1/2 -left-5 hidden -translate-y-1/2 bg-mistica-background-container shadow-[0_2px_8px_rgba(0,0,0,0.2)] lg:inline-flex"
                >
                    <ChevronLeft />
                </IconButton>
            ) : null}
            {page < pages - 1 ? (
                <IconButton
                    aria-label="Próximo"
                    size="small"
                    onClick={() => scrollToPage(page + 1)}
                    className="absolute top-1/2 -right-5 hidden -translate-y-1/2 bg-mistica-background-container shadow-[0_2px_8px_rgba(0,0,0,0.2)] lg:inline-flex"
                >
                    <ChevronRight />
                </IconButton>
            ) : null}

            {withBullets && pages > 1 ? (
                <div className="mt-4 flex justify-center gap-2">
                    {Array.from({length: pages}, (_, i) => (
                        <button
                            key={i}
                            type="button"
                            aria-label={`Ir para página ${i + 1}`}
                            aria-current={i === page || undefined}
                            onClick={() => scrollToPage(i)}
                            className={cn(
                                'h-2 cursor-pointer rounded-mistica-bar transition-all duration-200',
                                i === page ? 'w-5 bg-mistica-control-activated' : 'w-2 bg-mistica-bar-track hover:bg-mistica-control'
                            )}
                        />
                    ))}
                </div>
            ) : null}
        </div>
    );
}

export {Carousel};
