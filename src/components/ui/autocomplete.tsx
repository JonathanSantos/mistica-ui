import * as React from 'react';
import {ChevronDown} from 'lucide-react';

import {cn} from '@/lib/utils';
import {TextField} from '@/components/ui/text-field';

/**
 * Autocomplete Mistica: campo com sugestoes filtradas conforme digita,
 * navegacao por teclado (setas/Enter/Escape) e semantica de combobox.
 */
function normalizar(texto: string): string {
    return texto
        .toLowerCase()
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '');
}

type AutocompleteProps = {
    label: string;
    options: Array<string>;
    value: string;
    onChangeValue: (value: string) => void;
    helperText?: string;
    error?: boolean;
    noResultsText?: string;
    disabled?: boolean;
    className?: string;
};

function Autocomplete({
    label,
    options,
    value,
    onChangeValue,
    helperText,
    error,
    noResultsText = 'Nenhum resultado',
    disabled,
    className,
}: AutocompleteProps) {
    const id = React.useId();
    const [aberto, setAberto] = React.useState(false);
    const [destacada, setDestacada] = React.useState(0);
    const wrapperRef = React.useRef<HTMLDivElement>(null);

    const filtradas = React.useMemo(() => {
        const busca = normalizar(value);
        return busca ? options.filter((o) => normalizar(o).includes(busca)) : options;
    }, [options, value]);

    React.useEffect(() => {
        setDestacada(0);
    }, [value]);

    // fecha ao clicar fora
    React.useEffect(() => {
        const aoClicarFora = (event: MouseEvent) => {
            if (!wrapperRef.current?.contains(event.target as Node)) {
                setAberto(false);
            }
        };
        document.addEventListener('mousedown', aoClicarFora);
        return () => document.removeEventListener('mousedown', aoClicarFora);
    }, []);

    const escolher = (opcao: string) => {
        onChangeValue(opcao);
        setAberto(false);
    };

    const aoTeclar = (event: React.KeyboardEvent) => {
        if (event.key === 'ArrowDown') {
            event.preventDefault();
            setAberto(true);
            setDestacada((i) => Math.min(i + 1, filtradas.length - 1));
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            setDestacada((i) => Math.max(i - 1, 0));
        } else if (event.key === 'Enter' && aberto && filtradas[destacada]) {
            event.preventDefault();
            escolher(filtradas[destacada]);
        } else if (event.key === 'Escape') {
            setAberto(false);
        }
    };

    return (
        <div ref={wrapperRef} data-slot="autocomplete" className={cn('relative', className)}>
            <TextField
                label={label}
                value={value}
                disabled={disabled}
                error={error}
                helperText={helperText}
                role="combobox"
                aria-expanded={aberto}
                aria-controls={`${id}-listbox`}
                aria-activedescendant={aberto && filtradas[destacada] ? `${id}-opt-${destacada}` : undefined}
                autoComplete="off"
                onChange={(e) => {
                    onChangeValue(e.target.value);
                    setAberto(true);
                }}
                onFocus={() => setAberto(true)}
                onKeyDown={aoTeclar}
                endAdornment={
                    <div className="pointer-events-none p-2 text-mistica-chevron-indicator">
                        <ChevronDown className={cn('size-5 transition-transform duration-150', aberto && 'rotate-180')} />
                    </div>
                }
            />
            {aberto && !disabled ? (
                <ul
                    id={`${id}-listbox`}
                    role="listbox"
                    className="absolute inset-x-0 top-full z-50 mt-2 max-h-64 overflow-y-auto rounded-mistica-popup bg-mistica-background-container py-2 shadow-[0_8px_24px_rgba(0,0,0,0.16)]"
                >
                    {filtradas.length === 0 ? (
                        <li className="px-4 py-3 text-base text-mistica-text-secondary">{noResultsText}</li>
                    ) : (
                        filtradas.map((opcao, index) => (
                            <li
                                key={opcao}
                                id={`${id}-opt-${index}`}
                                role="option"
                                aria-selected={opcao === value}
                                onMouseDown={(e) => {
                                    e.preventDefault(); // nao rouba o foco do input
                                    escolher(opcao);
                                }}
                                onMouseEnter={() => setDestacada(index)}
                                className={cn(
                                    'cursor-pointer px-4 py-(--mistica-menu-item-padding-y) text-base text-mistica-text-primary',
                                    index === destacada && 'bg-mistica-background-container-hover',
                                    opcao === value && 'text-mistica-text-activated'
                                )}
                            >
                                {opcao}
                            </li>
                        ))
                    )}
                </ul>
            ) : null}
        </div>
    );
}

export {Autocomplete};
