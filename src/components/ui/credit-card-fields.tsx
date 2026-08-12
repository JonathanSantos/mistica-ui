import * as React from 'react';
import {CreditCard} from 'lucide-react';

import {TextField} from '@/components/ui/text-field';

/**
 * CreditCardFields Mistica: numero (grupos de 4), validade (MM/AA) e CVV,
 * compostos a partir do TextField. Exporta os campos individuais e o
 * agrupamento pronto CreditCardFields.
 */
function formatCardNumber(raw: string): string {
    const digits = raw.replace(/\D/g, '').slice(0, 19);
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
}

function formatExpiration(raw: string): string {
    let digits = raw.replace(/\D/g, '').slice(0, 4);
    // "4" -> "04" (mes nunca comeca com 2-9)
    if (digits.length >= 1 && Number(digits[0]) > 1) {
        digits = `0${digits}`;
    }
    if (digits.length <= 2) {
        return digits;
    }
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

type FieldProps = Omit<React.ComponentProps<typeof TextField>, 'type' | 'endAdornment'>;

function CreditCardNumberField({onChange, ...props}: FieldProps) {
    return (
        <TextField
            type="text"
            inputMode="numeric"
            autoComplete="cc-number"
            maxLength={23}
            endAdornment={
                <div className="p-2 text-mistica-neutral-medium">
                    <CreditCard className="size-5" aria-hidden />
                </div>
            }
            onChange={(event) => {
                event.target.value = formatCardNumber(event.target.value);
                onChange?.(event);
            }}
            {...props}
        />
    );
}

function CreditCardExpirationField({onChange, ...props}: FieldProps) {
    return (
        <TextField
            type="text"
            inputMode="numeric"
            autoComplete="cc-exp"
            maxLength={5}
            onChange={(event) => {
                event.target.value = formatExpiration(event.target.value);
                onChange?.(event);
            }}
            {...props}
        />
    );
}

function CreditCardCvvField({onChange, ...props}: FieldProps) {
    return (
        <TextField
            type="password"
            inputMode="numeric"
            autoComplete="cc-csc"
            maxLength={4}
            onChange={(event) => {
                event.target.value = event.target.value.replace(/\D/g, '').slice(0, 4);
                onChange?.(event);
            }}
            {...props}
        />
    );
}

/** Agrupamento padrao: numero em cima, validade + CVV lado a lado. */
function CreditCardFields({className}: {className?: string}) {
    return (
        <div className={className}>
            <CreditCardNumberField label="Número do cartão" />
            <div className="mt-4 grid grid-cols-2 gap-4">
                <CreditCardExpirationField label="Validade" helperText="MM/AA" />
                <CreditCardCvvField label="CVV" helperText="3 ou 4 dígitos" />
            </div>
        </div>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export {
    CreditCardFields,
    CreditCardNumberField,
    CreditCardExpirationField,
    CreditCardCvvField,
    formatCardNumber,
    formatExpiration,
};
