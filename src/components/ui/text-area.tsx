import * as React from 'react';

import {cn} from '@/lib/utils';
import {FieldHelperText, fieldFrameClasses, fieldLabelClasses} from '@/components/ui/text-field';

/** TextArea Mistica: mesmo frame do TextField (label flutuante), multilinha. */
type TextAreaProps = Omit<React.ComponentProps<'textarea'>, 'placeholder'> & {
    label: string;
    helperText?: string;
    error?: boolean;
};

function TextArea({className, label, helperText, error, id, disabled, rows = 4, ...props}: TextAreaProps) {
    const autoId = React.useId();
    const inputId = id ?? autoId;
    const helperId = `${inputId}-helper`;

    return (
        <div
            data-slot="text-area"
            className={cn('w-full min-w-0', disabled && 'opacity-50', className)}
        >
            <div className="relative">
                <textarea
                    id={inputId}
                    rows={rows}
                    disabled={disabled}
                    aria-invalid={error || undefined}
                    aria-describedby={helperText ? helperId : undefined}
                    placeholder=" "
                    className={cn('min-h-28 resize-y pt-6', fieldFrameClasses(error))}
                    {...props}
                />
                <label
                    htmlFor={inputId}
                    className={cn(
                        fieldLabelClasses(error),
                        // Em multilinha o label "em repouso" fica no topo, nao centrado
                        'peer-placeholder-shown:top-4 peer-placeholder-shown:translate-y-0'
                    )}
                >
                    {label}
                </label>
            </div>
            {helperText ? (
                <FieldHelperText id={helperId} error={error}>
                    {helperText}
                </FieldHelperText>
            ) : null}
        </div>
    );
}

export {TextArea};
