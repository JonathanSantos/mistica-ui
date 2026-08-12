import * as React from 'react';
import {Search, X} from 'lucide-react';

import {TextField} from '@/components/ui/text-field';

/** SearchField Mistica: TextField com botao de limpar quando ha valor. */
type SearchFieldProps = Omit<React.ComponentProps<typeof TextField>, 'type' | 'endIcon'> & {
    onClear?: () => void;
};

function SearchField({value, defaultValue, onChange, onClear, ...props}: SearchFieldProps) {
    const isControlled = value !== undefined;
    const [innerValue, setInnerValue] = React.useState(defaultValue ?? '');
    const currentValue = isControlled ? value : innerValue;
    const inputRef = React.useRef<HTMLInputElement>(null);

    const clear = () => {
        if (!isControlled) {
            setInnerValue('');
        }
        if (inputRef.current) {
            // dispara um change nativo para formularios controlados externamente
            const setter = Object.getOwnPropertyDescriptor(
                window.HTMLInputElement.prototype,
                'value'
            )?.set;
            setter?.call(inputRef.current, '');
            inputRef.current.dispatchEvent(new Event('input', {bubbles: true}));
            inputRef.current.focus();
        }
        onClear?.();
    };

    return (
        <TextField
            ref={inputRef}
            type="search"
            inputMode="search"
            value={value}
            defaultValue={defaultValue}
            onChange={(event) => {
                if (!isControlled) {
                    setInnerValue(event.target.value);
                }
                onChange?.(event);
            }}
            className="[&_input::-webkit-search-cancel-button]:hidden"
            endIcon={
                currentValue ? (
                    <button
                        type="button"
                        aria-label="Limpar busca"
                        onClick={clear}
                        className="cursor-pointer rounded-full p-2 text-mistica-neutral-medium outline-none hover:bg-mistica-background-container-hover focus-visible:ring-2 focus-visible:ring-mistica-control-activated"
                    >
                        <X className="size-5" />
                    </button>
                ) : (
                    <div className="p-2 text-mistica-neutral-medium">
                        <Search className="size-5" />
                    </div>
                )
            }
            {...props}
        />
    );
}

export {SearchField};
