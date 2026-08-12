import * as React from 'react';
import {ArrowLeft} from 'lucide-react';

import {cn} from '@/lib/utils';
import {IconButton} from '@/components/ui/icon-button';
import {Text} from '@/components/ui/text';

/**
 * NavigationBar / MainNavigationBar Mistica.
 *
 * No skin vivo o navigationBarBackground E ROXO (#660099) com textos brancos,
 * como no app da Vivo — nao e um estado "inverse", e o padrao do skin.
 * Todos os conteudos internos herdam textNavigationBarPrimary/Secondary,
 * entao funcionam em qualquer skin/modo.
 */
type NavigationBarProps = {
    title?: string;
    onBack?: () => void;
    /** Acoes a direita (IconButtons com text-current herdam a cor da barra). */
    actions?: React.ReactNode;
    /** Remove a borda inferior. */
    withoutDivider?: boolean;
    className?: string;
};

function NavigationBar({title, onBack, actions, withoutDivider, className}: NavigationBarProps) {
    return (
        <header
            data-slot="navigation-bar"
            className={cn(
                'flex h-14 items-center gap-2 bg-mistica-navigation-bar-background px-2 text-mistica-text-navigation-bar-primary lg:h-16 lg:px-4',
                !withoutDivider && 'border-b border-mistica-navigation-bar-divider',
                className
            )}
        >
            {onBack ? (
                <IconButton
                    Icon={ArrowLeft}
                    aria-label="Voltar"
                    small
                    onPress={onBack}
                    className="text-current hover:bg-white/15 active:bg-white/25 focus-visible:ring-current"
                />
            ) : null}
            {title ? (
                <Text
                    as="h1"
                    preset="text3"
                    className={cn('flex-1 truncate', onBack ? '' : 'pl-2')}
                    style={{fontWeight: 'var(--mistica-text-weight-navigation-bar, 400)'}}
                >
                    {title}
                </Text>
            ) : (
                <div className="flex-1" />
            )}
            {actions ? <div className="flex items-center gap-1">{actions}</div> : null}
        </header>
    );
}

type MainNavigationBarProps = {
    /** Logo ou marca (ReactNode) mostrado a esquerda; herda a cor da barra. */
    logo?: React.ReactNode;
    sections: Array<{title: string; onPress?: () => void; href?: string}>;
    selectedIndex?: number;
    /** Acoes a direita (IconButtons, Avatar...). */
    actions?: React.ReactNode;
    className?: string;
};

function MainNavigationBar({logo, sections, selectedIndex = 0, actions, className}: MainNavigationBarProps) {
    return (
        <header
            data-slot="main-navigation-bar"
            className={cn(
                'flex h-14 items-center gap-6 border-b border-mistica-navigation-bar-divider bg-mistica-navigation-bar-background px-4 text-mistica-text-navigation-bar-primary lg:h-16 lg:px-6',
                className
            )}
        >
            {logo ? <div className="shrink-0">{logo}</div> : null}
            <nav className="flex h-full flex-1 items-stretch gap-4 overflow-x-auto">
                {sections.map((section, index) => {
                    const selected = index === selectedIndex;
                    const Comp = section.href ? 'a' : 'button';
                    return (
                        <Comp
                            key={section.title}
                            href={section.href}
                            onClick={section.onPress}
                            aria-current={selected ? 'page' : undefined}
                            className={cn(
                                'relative inline-flex shrink-0 cursor-pointer items-center px-1 text-base outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-current',
                                'after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:rounded-mistica-bar',
                                selected
                                    ? 'font-medium text-mistica-text-navigation-bar-primary after:bg-current'
                                    : 'text-mistica-text-navigation-bar-secondary after:bg-transparent hover:text-mistica-text-navigation-bar-primary'
                            )}
                        >
                            {section.title}
                        </Comp>
                    );
                })}
            </nav>
            {actions ? <div className="flex shrink-0 items-center gap-1">{actions}</div> : null}
        </header>
    );
}

type FunnelNavigationBarProps = {
    /** Logo/marca a esquerda; herda a cor da barra. */
    logo?: React.ReactNode;
    /** Acoes a direita (ajuda, fechar...). */
    actions?: React.ReactNode;
    className?: string;
};

/** FunnelNavigationBar Mistica: barra de funil (logo + acoes, sem secoes). */
function FunnelNavigationBar({logo, actions, className}: FunnelNavigationBarProps) {
    return (
        <header
            data-slot="funnel-navigation-bar"
            className={cn(
                'flex h-14 items-center justify-between gap-4 bg-mistica-navigation-bar-background px-4 text-mistica-text-navigation-bar-primary lg:h-16 lg:px-6',
                className
            )}
        >
            <div className="shrink-0">{logo}</div>
            {actions ? <div className="flex items-center gap-1">{actions}</div> : null}
        </header>
    );
}

export {NavigationBar, MainNavigationBar, FunnelNavigationBar};
