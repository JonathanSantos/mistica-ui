import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import {ChevronRight} from 'lucide-react';

import {cn} from '@/lib/utils';
import {Badge} from '@/components/ui/badge';
import {Checkbox} from '@/components/ui/checkbox';
import {Switch} from '@/components/ui/switch';
import {Text} from '@/components/ui/text';
import {Divider} from '@/components/ui/divider';

/**
 * Row / RowList Mistica: linhas de lista com asset a esquerda,
 * titulo/subtitulo/descricao, controle ou chevron a direita.
 * API do Mistica original: onPress/href, switch/checkbox ({name, value,
 * defaultValue, onChange}) com a linha toda clicavel, badge.
 */
type ControlProps = {
    name?: string;
    value?: boolean;
    defaultValue?: boolean;
    onChange?: (checked: boolean) => void;
};

type RowProps = {
    title: string;
    subtitle?: string;
    description?: string;
    /** Headline acima do titulo (ex: <Tag/>), como no Mistica. */
    headline?: React.ReactNode;
    /** Icone, Avatar ou qualquer asset a esquerda. */
    asset?: React.ReactNode;
    /** Badge a direita: true = ponto; numero = contador. */
    badge?: boolean | number;
    /** Controle a direita (Tag, texto...). Substitui o chevron. */
    right?: React.ReactNode;
    /** Switch a direita; a linha toda alterna (como no Mistica). */
    switch?: ControlProps;
    /** Checkbox a direita; a linha toda alterna (como no Mistica). */
    checkbox?: ControlProps;
    /** Dentro de um RadioGroup: a linha vira uma opcao (como no Mistica). */
    radioValue?: string;
    /** Forca exibir/ocultar o chevron (padrao: aparece quando clicavel). */
    chevron?: boolean;
    href?: string;
    onPress?: () => void;
    className?: string;
};

function Row({
    title,
    subtitle,
    description,
    headline,
    asset,
    badge,
    right,
    switch: switchProps,
    checkbox: checkboxProps,
    radioValue,
    chevron,
    href,
    onPress,
    className,
}: RowProps) {
    const press = onPress;
    // controle nao-controlado precisa de estado interno para a linha alternar
    const control = switchProps ?? checkboxProps;
    const [interno, setInterno] = React.useState(control?.defaultValue ?? false);
    const marcado = control?.value ?? interno;

    const alternar = control
        ? (proximo: boolean) => {
              setInterno(proximo);
              control.onChange?.(proximo);
          }
        : undefined;

    const radioRef = React.useRef<HTMLButtonElement>(null);
    const clickable = Boolean(href ?? press ?? control ?? radioValue);
    const showChevron = chevron ?? (Boolean(href ?? press) && !right && !control && !radioValue);

    const rightContent = control ? (
        // stopPropagation: clicar direto no controle ja alterna sozinho
        <span onClick={(event) => event.stopPropagation()}>
            {switchProps ? (
                <Switch name={control.name} checked={marcado} onChange={alternar} aria-label={title} />
            ) : (
                <Checkbox name={control.name} checked={marcado} onChange={alternar} aria-label={title} />
            )}
        </span>
    ) : radioValue !== undefined ? (
        // stopPropagation: clicar direto no radio ja seleciona sozinho
        <span onClick={(event) => event.stopPropagation()}>
            <RadioGroupPrimitive.Item
                ref={radioRef}
                value={radioValue}
                aria-label={title}
                className="aspect-square size-5 shrink-0 cursor-pointer rounded-full border-[1.5px] border-mistica-control bg-transparent transition-colors duration-100 outline-none focus-visible:ring-2 focus-visible:ring-mistica-control-activated focus-visible:ring-offset-2 focus-visible:ring-offset-mistica-background data-[state=checked]:border-mistica-control-activated"
            >
                <RadioGroupPrimitive.Indicator className="flex size-full items-center justify-center">
                    <span className="size-2.5 rounded-full bg-mistica-control-activated" />
                </RadioGroupPrimitive.Indicator>
            </RadioGroupPrimitive.Item>
        </span>
    ) : (
        <>
            {right}
            {badge !== undefined && badge !== false ? (
                <Badge value={typeof badge === 'number' ? badge : undefined} />
            ) : null}
        </>
    );

    const temDireita = Boolean(
        control || radioValue !== undefined || right || (badge !== undefined && badge !== false)
    );

    const content = (
        <>
            {asset ? <div className="shrink-0">{asset}</div> : null}
            <div className="grid min-w-0 flex-1 gap-0.5 text-left">
                {headline ? <div className="mb-0.5">{headline}</div> : null}
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
            {temDireita ? <div className="flex shrink-0 items-center gap-2">{rightContent}</div> : null}
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
    if (control && alternar) {
        // div (nao button) porque o controle interno ja e um button
        return (
            <div data-slot="row" className={baseClasses} onClick={() => alternar(!marcado)}>
                {content}
            </div>
        );
    }
    if (radioValue !== undefined) {
        return (
            <div data-slot="row" className={baseClasses} onClick={() => radioRef.current?.click()}>
                {content}
            </div>
        );
    }
    if (press) {
        return (
            <button data-slot="row" type="button" onClick={press} className={baseClasses}>
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
