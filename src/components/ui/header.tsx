import * as React from 'react';

import {cn} from '@/lib/utils';
import {Text} from '@/components/ui/text';

/**
 * Header / HeaderLayout / MainSectionHeader Mistica: cabecalhos de pagina.
 * HeaderLayout renderiza sobre o fundo brand (inverso); MainSectionHeader
 * e o cabecalho de secao de conteudo com acao a direita.
 */
type HeaderProps = {
    pretitle?: string;
    title: string;
    description?: string;
};

function Header({pretitle, title, description}: HeaderProps) {
    return (
        <div data-slot="header" className="grid gap-2">
            {pretitle ? (
                <Text preset="text2" weight="medium" className="text-mistica-text-secondary-inverse">
                    {pretitle}
                </Text>
            ) : null}
            <Text as="h1" preset="text6" color="inverse">
                {title}
            </Text>
            {description ? (
                <Text preset="text3" className="text-mistica-text-secondary-inverse">
                    {description}
                </Text>
            ) : null}
        </div>
    );
}

type HeaderLayoutProps = {
    /** Normalmente um <Header/>. */
    header: React.ReactNode;
    /** Breadcrumbs acima do header. */
    breadcrumbs?: React.ReactNode;
    /** Conteudo extra abaixo (busca, tabs...). */
    extra?: React.ReactNode;
    className?: string;
};

function HeaderLayout({header, breadcrumbs, extra, className}: HeaderLayoutProps) {
    return (
        <div data-slot="header-layout" className={cn('bg-mistica-background-brand px-4 py-6 lg:px-12 lg:py-12', className)}>
            <div className="mx-auto grid max-w-[1224px] gap-4">
                {breadcrumbs ? (
                    <div className="[&_a]:text-mistica-text-secondary-inverse [&_span]:text-mistica-text-primary-inverse">
                        {breadcrumbs}
                    </div>
                ) : null}
                {header}
                {extra}
            </div>
        </div>
    );
}

type MainSectionHeaderProps = {
    title: string;
    description?: string;
    /** Acao a direita (Button). */
    action?: React.ReactNode;
    className?: string;
};

function MainSectionHeader({title, description, action, className}: MainSectionHeaderProps) {
    return (
        <div data-slot="main-section-header" className={cn('flex flex-wrap items-start justify-between gap-4', className)}>
            <div className="grid gap-1">
                <Text as="h2" preset="text5">
                    {title}
                </Text>
                {description ? (
                    <Text preset="text2" color="secondary">
                        {description}
                    </Text>
                ) : null}
            </div>
            {action ? <div className="shrink-0">{action}</div> : null}
        </div>
    );
}

export {Header, HeaderLayout, MainSectionHeader};
