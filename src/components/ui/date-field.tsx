import * as React from 'react';

import {cn} from '@/lib/utils';
import {FieldHelperText, fieldFrameClasses} from '@/components/ui/text-field';

/**
 * DateField Mistica: campo de data nativo com o frame do TextField.
 * O label fica sempre flutuado (inputs de data sempre mostram conteudo).
 */
type DateFieldProps = Omit<React.ComponentProps<'input'>, 'placeholder' | 'type'> & {
    label: string;
    helperText?: string;
    error?: boolean;
    /** Como no Mistica: recebe o valor direto. */
    onChangeValue?: (value: string) => void;
    optional?: boolean;
    /** Tipo de data/hora nativo. */
    type?: 'date' | 'datetime-local' | 'month' | 'time';
};

function DateField({
    className,
    label,
    helperText,
    error,
    onChange,
    onChangeValue,
    optional,
    id,
    disabled,
    type = 'date',
    ...props
}: DateFieldProps) {
    const autoId = React.useId();
    const inputId = id ?? autoId;
    const helperId = `${inputId}-helper`;

    return (
        <div data-slot="date-field" className={cn('w-full min-w-0', disabled && 'opacity-50', className)}>
            <div className="relative">
                <input
                    id={inputId}
                    type={type}
                    disabled={disabled}
                    onChange={(event) => {
                        onChange?.(event);
                        onChangeValue?.(event.target.value);
                    }}
                    aria-invalid={error || undefined}
                    aria-describedby={helperText ? helperId : undefined}
                    className={cn(
                        'h-(--mistica-height-field) appearance-none',
                        // centraliza o icone do calendario no eixo vertical do campo
                        // (compensa o padding assimetrico pt-5/pb-1 do frame)
                        '[&::-webkit-calendar-picker-indicator]:-mt-2 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-60 hover:[&::-webkit-calendar-picker-indicator]:opacity-100',
                        fieldFrameClasses(error)
                    )}
                    {...props}
                />
                <label
                    htmlFor={inputId}
                    className={cn(
                        'pointer-events-none absolute left-4 top-2 text-xs transition-colors duration-150',
                        error ? 'text-mistica-control-error' : 'text-mistica-text-secondary'
                    )}
                >
                    {optional ? `${label} (opcional)` : label}
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

/** TimeField Mistica: DateField com tipo time. */
function TimeField(props: Omit<DateFieldProps, 'type'>) {
    return <DateField type="time" {...props} />;
}

/** DateTimeField Mistica: DateField com data e hora. */
function DateTimeField(props: Omit<DateFieldProps, 'type'>) {
    return <DateField type="datetime-local" {...props} />;
}

/** MonthField Mistica: DateField com mes/ano. */
function MonthField(props: Omit<DateFieldProps, 'type'>) {
    return <DateField type="month" {...props} />;
}

export {DateField, TimeField, DateTimeField, MonthField};
