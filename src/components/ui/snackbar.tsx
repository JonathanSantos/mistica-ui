import {toast, Toaster} from 'sonner';

import {cn} from '@/lib/utils';

/**
 * Snackbar Mistica sobre sonner: barra inferior com radius de popup,
 * fundo feedbackInfoBackground (informativo) ou feedbackErrorBackground
 * (critico) e acao com textLinkSnackbar. API imperativa como no Mistica.
 */
type SnackbarType = 'informative' | 'critical';

type ShowSnackbarOptions = {
    message: string;
    type?: SnackbarType;
    buttonText?: string;
    onButtonClick?: () => void;
    /** ms; padrao 5000 (10000 quando ha botao, como no Mistica) */
    duration?: number;
};

function showSnackbar({
    message,
    type = 'informative',
    buttonText,
    onButtonClick,
    duration,
}: ShowSnackbarOptions): void {
    toast.custom(
        (id) => (
            <div
                data-slot="snackbar"
                className={cn(
                    'flex min-h-12 w-full items-center justify-between gap-4 rounded-mistica-popup px-4 py-3.5 sm:min-w-90',
                    type === 'critical'
                        ? 'bg-mistica-feedback-error-background'
                        : 'bg-mistica-feedback-info-background'
                )}
            >
                <p className="text-base text-mistica-text-primary-inverse">{message}</p>
                {buttonText ? (
                    <button
                        type="button"
                        className="shrink-0 cursor-pointer rounded-lg px-2 py-1 text-base font-medium text-mistica-text-link-snackbar hover:opacity-80"
                        onClick={() => {
                            toast.dismiss(id);
                            onButtonClick?.();
                        }}
                    >
                        {buttonText}
                    </button>
                ) : null}
            </div>
        ),
        {duration: duration ?? (buttonText ? 10000 : 5000)}
    );
}

function SnackbarProvider() {
    return <Toaster position="bottom-center" gap={8} toastOptions={{unstyled: true, className: 'w-full flex justify-center'}} />;
}

// eslint-disable-next-line react-refresh/only-export-components
export {SnackbarProvider, showSnackbar};
