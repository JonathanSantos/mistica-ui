import * as React from 'react';

import {TextField} from '@/components/ui/text-field';

/**
 * PhoneNumberField Mistica: TextField com mascara de telefone BR
 * ((11) 91234-5678), teclado numerico no mobile.
 */
function formatBrPhone(raw: string): string {
    const digits = raw.replace(/\D/g, '').slice(0, 11);
    if (digits.length === 0) {
        return '';
    }
    if (digits.length <= 2) {
        return `(${digits}`;
    }
    if (digits.length <= 6) {
        return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    }
    if (digits.length <= 10) {
        return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    }
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

type PhoneNumberFieldProps = Omit<React.ComponentProps<typeof TextField>, 'type'>;

function PhoneNumberField({onChange, ...props}: PhoneNumberFieldProps) {
    return (
        <TextField
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={16}
            onChange={(event) => {
                event.target.value = formatBrPhone(event.target.value);
                onChange?.(event);
            }}
            {...props}
        />
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export {PhoneNumberField, formatBrPhone};
