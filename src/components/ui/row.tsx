import * as React from 'react';
import {ChevronRight} from 'lucide-react';

import {cn} from '@/lib/utils';
import {Switch} from '@/components/ui/switch';
import {Text} from '@/components/ui/text';
import {Divider} from '@/components/ui/divider';

/**
 * Row / RowList Mistica: linhas de lista com asset a esquerda,
 * titulo/subtitulo/descricao, controle ou chevron a direita.
 * Clicavel quando recebe onClick, href ou toggle (a linha toda
 * alterna o switch, como no Mistica).
 */
type RowProps = {
    title: string;
    subtitle?: string;
    description?: string;
    /** Icone, Avatar ou qualquer asset a esquerda. */
    asset?: React.ReactNode;
    /** Controle a direita (Switch, Checkbox, Tag...). Substitui o chevron. */
    right?: React.ReactNode;
    /**
     * Renderiza um Switch a direita e torna a linha toda clicavel para
     * alterna-lo (comportamento do Row com switch do Mistica).
     */
    toggle?: {checked: boolean; onCheckedChange: (checked: boolean) => void; 'aria-label'?: string};
    /** Forca exibir/ocultar o chevron (padrao: aparece quando clicavel). */
    chevron?: boolean;
    href?: string;
    onClick?: () => void;
    className?: string;
};

function Row({title, subtitle, description, asset, right, toggle, chevron, href, onClick, className}: RowProps) {
    const clickable = Boolean(href ?? onClick ?? toggle);
    const showChevron = chevron ?? (clickable && !right && !toggle);

    const rightContent = toggle ? (
        // stopPropagation: clicar direto no switch ja alterna via Radix
        <span onClick={(event) => event.stopPropagation()}>
            <Switch
                checked={toggle.checked}
                onCheckedChange={toggle.onCheckedChange}
                aria-label={toggle['aria-label'] ?? title}
            />
        </span>
    ) : (
        right
    );

    const content = (
        <>
            {asset ? <div className="shrink-0">{asset}</div> : null}
            <div className="grid min-w-0 flex-1 gap-0.5 text-left">
                <Text as="div" preset="text3" className="truncate">
                    {title}
                </Text>
                {subtitle ? (
                    <Text as="div" preset="text2" color="secondary" className="truncate">
                        {subtitle}
                    </Text>
                ) : null}
                {description ? (
                    <Text as="div" preset="text2" color="secondary">
                        {description}
                    </Text>
                ) : null}
            </div>
            {rightContent ? <div className="shrink-0">{rightContent}</div> : null}
            {showChevron ? (
                <ChevronRight className="size-5 shrink-0 text-mistica-chevron-indicator" aria-hidden />
            ) : null}
        </>
    );

    const baseClasses = cn(
        'flex min-h-(--mistica-height-row) w-full items-center gap-4 px-4 py-(--mistica-row-padding-y)',
        clickable &&
            'cursor-pointer transition-colors outline-none hover:bg-mistica-background-container-hover active:bg-mistica-background-container-pressed focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-mistica-control-activated',
        className
    );

    if (href) {
        return (
            <a data-slot="row" href={href} className={baseClasses}>
                {content}
            </a>
        );
    }
    if (toggle) {
        // div (nao button) porque o Switch interno ja e um button
        return (
            <div
                data-slot="row"
                className={baseClasses}
                onClick={() => toggle.onCheckedChange(!toggle.checked)}
            >
                {content}
            </div>
        );
    }
    if (onClick) {
        return (
            <button data-slot="row" type="button" onClick={onClick} className={baseClasses}>
                {content}
            </button>
        );
    }
    return (
        <div data-slot="row" className={baseClasses}>
            {content}
        </div>
    );
}

type RowListProps = {
    children: React.ReactNode;
    /** true: cada linha vira um container boxed (BoxedRowList do Mistica). */
    boxed?: boolean;
    /** Esconde os dividers entre linhas (lista simples). */
    noDividers?: boolean;
    className?: string;
};

function RowList({children, boxed = false, noDividers = false, className}: RowListProps) {
    const rows = React.Children.toArray(children);

    if (boxed) {
        return (
            <div data-slot="row-list" className={cn('grid gap-4', className)}>
                {rows.map((row, i) => (
                    <div
                        key={i}
                        className="overflow-hidden rounded-mistica-container border border-mistica-border bg-mistica-background-container"
                    >
                        {row}
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div data-slot="row-list" className={cn('grid', className)}>
            {rows.map((row, i) => (
                <React.Fragment key={i}>
                    {row}
                    {!noDividers && i < rows.length - 1 ? <Divider className="ml-4" /> : null}
                </React.Fragment>
            ))}
        </div>
    );
}

export {Row, RowList};
