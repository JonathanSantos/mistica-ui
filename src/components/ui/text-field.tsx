import * as React from 'react';

import {cn} from '@/lib/utils';

/**
 * TextField Mistica (skin vivo): container de 56px com label flutuante,
 * radius de input do skin (16px) e estados de foco/erro com os tokens
 * controlActivated / controlError. Comportamento de input nativo (shadcn).
 */

// Classes compartilhadas entre TextField, TextArea e variantes (Password, Search)
const fieldFrameClasses = (error?: boolean) =>
    cn(
        'peer w-full rounded-mistica-input border bg-mistica-background-container px-4 pt-5 pb-1 text-base text-mistica-text-primary outline-none transition-[border-color,box-shadow] duration-150',
        error
            ? 'border-mistica-control-error focus:shadow-[inset_0_0_0_1px_var(--mistica-control-error)]'
            : 'border-mistica-input-border focus:border-mistica-control-activated focus:shadow-[inset_0_0_0_1px_var(--mistica-control-activated)]'
    );

const fieldLabelClasses = (error?: boolean) =>
    cn(
        'pointer-events-none absolute left-4 top-2 text-xs transition-all duration-150',
        'peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base',
        'peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-xs',
        error
            ? 'text-mistica-control-error'
            : 'text-mistica-text-secondary peer-focus:text-mistica-control-activated'
    );

function FieldHelperText({
    id,
    error,
    children,
}: {
    id: string;
    error?: boolean;
    children: React.ReactNode;
}) {
    return (
        <p
            id={id}
            className={cn(
                'mt-1 px-4 text-xs leading-4',
                error ? 'text-mistica-text-error' : 'text-mistica-text-secondary'
            )}
        >
            {children}
        </p>
    );
}

type TextFieldProps = Omit<React.ComponentProps<'input'>, 'placeholder'> & {
    label: string;
    helperText?: string;
    error?: boolean;
    /** Conteudo fixo no fim do campo (icone/botao), ex: olho do PasswordField. */
    endAdornment?: React.ReactNode;
};

function TextField({
    className,
    label,
    helperText,
    error,
    endAdornment,
    id,
    disabled,
    ...props
}: TextFieldProps) {
    const autoId = React.useId();
    const inputId = id ?? autoId;
    const helperId = `${inputId}-helper`;

    return (
        <div
            data-slot="text-field"
            className={cn('w-full min-w-0', disabled && 'opacity-50', className)}
        >
            <div className="relative">
                <input
                    id={inputId}
                    disabled={disabled}
                    aria-invalid={error || undefined}
                    aria-describedby={helperText ? helperId : undefined}
                    placeholder=" "
                    className={cn(
                        'h-(--mistica-height-field)',
                        fieldFrameClasses(error),
                        endAdornment && 'pr-12'
                    )}
                    {...props}
                />
                <label htmlFor={inputId} className={fieldLabelClasses(error)}>
                    {label}
                </label>
                {endAdornment ? (
                    <div className="absolute top-1/2 right-2 -translate-y-1/2">{endAdornment}</div>
                ) : null}
            </div>
            {helperText ? (
                <FieldHelperText id={helperId} error={error}>
                    {helperText}
                </FieldHelperText>
            ) : null}
        </div>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export {TextField, fieldFrameClasses, fieldLabelClasses, FieldHelperText};
