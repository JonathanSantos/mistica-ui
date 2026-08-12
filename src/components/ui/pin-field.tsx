import {OTPInput, type SlotProps} from 'input-otp';

import {cn} from '@/lib/utils';

/**
 * PinField Mistica: caixas de digito unico com avanco automatico
 * (OTP/PIN), frame de input do skin e foco controlActivated.
 */
type PinFieldProps = {
    length?: number;
    value?: string;
    onValueChange?: (value: string) => void;
    onComplete?: (value: string) => void;
    /** Esconde os digitos (senha). */
    hideCode?: boolean;
    disabled?: boolean;
    'aria-label'?: string;
    className?: string;
};

function PinSlot({slot, hideCode}: {slot: SlotProps; hideCode?: boolean}) {
    return (
        <div
            data-slot="pin-field-slot"
            className={cn(
                'relative flex h-(--mistica-height-field) w-12 items-center justify-center rounded-mistica-input border bg-mistica-background-container text-lg text-mistica-text-primary transition-[border-color,box-shadow] duration-150',
                slot.isActive
                    ? 'border-mistica-control-activated shadow-[inset_0_0_0_1px_var(--mistica-control-activated)]'
                    : 'border-mistica-input-border'
            )}
        >
            {hideCode && slot.char ? '•' : slot.char}
            {slot.hasFakeCaret ? (
                <div className="pointer-events-none absolute h-6 w-px animate-pulse bg-mistica-text-primary" />
            ) : null}
        </div>
    );
}

function PinField({
    length = 6,
    value,
    onValueChange,
    onComplete,
    hideCode = false,
    disabled,
    'aria-label': ariaLabel = 'Código de verificação',
    className,
}: PinFieldProps) {
    return (
        <OTPInput
            data-slot="pin-field"
            maxLength={length}
            value={value}
            onChange={onValueChange}
            onComplete={onComplete}
            disabled={disabled}
            aria-label={ariaLabel}
            inputMode="numeric"
            pattern="^[0-9]*$"
            containerClassName={cn('flex items-center gap-2 has-disabled:opacity-50', className)}
            render={({slots}) => (
                <>
                    {slots.map((slot, index) => (
                        <PinSlot key={index} slot={slot} hideCode={hideCode} />
                    ))}
                </>
            )}
        />
    );
}

export {PinField};
