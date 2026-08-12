import * as React from 'react';

import {TextField} from '@/components/ui/text-field';

/**
 * DecimalField / IntegerField Mistica: TextFields numericos.
 * Decimal aceita uma virgula (pt-BR) ou ponto; Integer so digitos.
 */
type NumericFieldProps = Omit<React.ComponentProps<typeof TextField>, 'type'>;

function DecimalField({onChange, ...props}: NumericFieldProps) {
    return (
        <TextField
            type="text"
            inputMode="decimal"
            onChange={(event) => {
                const cleaned = event.target.value
                    .replace(/[^\d.,]/g, '')
                    .replace(/([.,].*)[.,]/g, '$1');
                event.target.value = cleaned;
                onChange?.(event);
            }}
            {...props}
        />
    );
}

function IntegerField({onChange, ...props}: NumericFieldProps) {
    return (
        <TextField
            type="text"
            inputMode="numeric"
            onChange={(event) => {
                event.target.value = event.target.value.replace(/\D/g, '');
                onChange?.(event);
            }}
            {...props}
        />
    );
}

export {DecimalField, IntegerField};
