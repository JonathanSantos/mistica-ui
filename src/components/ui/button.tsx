import * as React from 'react';
import {Slot} from '@radix-ui/react-slot';
import {cva, type VariantProps} from 'class-variance-authority';

import {cn} from '@/lib/utils';
import {Spinner} from '@/components/ui/spinner';

/**
 * Botao Mistica (skin vivo) com API shadcn.
 *
 * Variantes espelham os componentes do Mistica:
 * - primary   -> ButtonPrimary
 * - secondary -> ButtonSecondary (borda 1.5px)
 * - danger    -> ButtonDanger
 * - link      -> ButtonLink
 */
const buttonVariants = cva(
    'inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-mistica-button font-medium transition-colors duration-100 outline-none focus-visible:ring-2 focus-visible:ring-mistica-control-activated focus-visible:ring-offset-2 focus-visible:ring-offset-mistica-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
    {
        variants: {
            variant: {
                primary:
                    'bg-mistica-button-primary-background text-mistica-text-button-primary hover:bg-mistica-button-primary-background-hover active:bg-mistica-button-primary-background-pressed',
                secondary:
                    'border-[1.5px] border-mistica-button-secondary-border bg-transparent text-mistica-text-button-secondary hover:bg-mistica-button-secondary-background-hover active:border-mistica-button-secondary-border-pressed active:bg-mistica-button-secondary-background-pressed active:text-mistica-text-button-secondary-pressed',
                danger: 'bg-mistica-button-danger-background text-mistica-text-button-primary hover:bg-mistica-button-danger-background-hover active:bg-mistica-button-danger-background-pressed',
                link: 'bg-transparent text-mistica-text-link active:bg-mistica-button-link-background-pressed',
            },
            size: {
                default:
                    'h-(--mistica-height-button) px-(--mistica-padding-x-button) text-base [&_svg]:size-5',
                small: 'h-(--mistica-height-button-small) px-3 text-sm [&_svg]:size-4',
            },
        },
        defaultVariants: {
            variant: 'primary',
            size: 'default',
        },
    }
);

/** Interno: implementacao compartilhada. A API publica sao os botoes nomeados. */
function Button({
    className,
    variant,
    size,
    asChild = false,
    loading = false,
    loadingText,
    disabled,
    children,
    ...props
}: React.ComponentProps<'button'> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean;
        /** Mostra o spinner do Mistica e desabilita o botao. */
        loading?: boolean;
        /** Texto exibido junto ao spinner (padrao: mantem o conteudo). */
        loadingText?: string;
    }) {
    const Comp = asChild && !loading ? Slot : 'button';

    return (
        <Comp
            data-slot="button"
            aria-busy={loading || undefined}
            disabled={disabled || loading}
            className={cn(buttonVariants({variant, size, className}))}
            {...props}
        >
            {loading ? (
                <>
                    <Spinner size={size === 'small' ? 16 : 20} className="text-current" />
                    {loadingText ?? children}
                </>
            ) : (
                children
            )}
        </Comp>
    );
}

/**
 * API identica ao Mistica original: ButtonPrimary/Secondary/Danger/Link/
 * ButtonLinkDanger com onPress, small, showSpinner, loadingText, submit e href.
 * Quem migra do @telefonica/mistica nao muda o codigo.
 */
type MisticaButtonProps = {
    children: React.ReactNode;
    onPress?: (event: React.MouseEvent<HTMLElement>) => void | Promise<void>;
    small?: boolean;
    showSpinner?: boolean;
    loadingText?: string;
    disabled?: boolean;
    /** true: botao de submit do form. */
    submit?: boolean;
    href?: string;
    newTab?: boolean;
    'aria-label'?: string;
    className?: string;
};

function criarBotaoMistica(
    nome: string,
    variant: 'primary' | 'secondary' | 'danger' | 'link',
    extraClassName?: string
) {
    function BotaoMistica({
        children,
        onPress,
        small,
        showSpinner,
        loadingText,
        disabled,
        submit,
        href,
        newTab,
        className,
        ...aria
    }: MisticaButtonProps) {
        const shared = {
            variant,
            size: (small ? 'small' : 'default') as 'small' | 'default',
            loading: showSpinner,
            loadingText,
            disabled,
            className: cn(extraClassName, className),
            ...aria,
        };

        if (href) {
            return (
                <Button asChild {...shared}>
                    <a
                        href={href}
                        target={newTab ? '_blank' : undefined}
                        rel={newTab ? 'noopener noreferrer' : undefined}
                        onClick={onPress}
                    >
                        {children}
                    </a>
                </Button>
            );
        }
        return (
            <Button type={submit ? 'submit' : 'button'} onClick={onPress} {...shared}>
                {children}
            </Button>
        );
    }
    // Nome publico nos devtools e no codigo gerado pelo Storybook
    BotaoMistica.displayName = nome;
    return BotaoMistica;
}

const ButtonPrimary = criarBotaoMistica('ButtonPrimary', 'primary');
const ButtonSecondary = criarBotaoMistica('ButtonSecondary', 'secondary');
const ButtonDanger = criarBotaoMistica('ButtonDanger', 'danger');
const ButtonLink = criarBotaoMistica('ButtonLink', 'link');
const ButtonLinkDanger = criarBotaoMistica(
    'ButtonLinkDanger',
    'link',
    'text-mistica-text-link-danger active:bg-mistica-button-link-danger-background-pressed'
);

export {ButtonPrimary, ButtonSecondary, ButtonDanger, ButtonLink, ButtonLinkDanger};
