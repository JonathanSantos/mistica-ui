import {toast, Toaster} from 'sonner';

import {cn} from '@/lib/utils';

/**
 * Snackbar Mistica sobre sonner, com a API do Mistica original:
 * useSnackbar().openSnackbar({message, type: 'INFORMATIVE'|'CRITICAL',
 * buttonText, duration, onClose(result)}). showSnackbar (nossa API
 * anterior) continua funcionando.
 */
type SnackbarCloseResult = {action: 'BUTTON' | 'TIMEOUT' | 'DISMISS'};

type OpenSnackbarParams = {
    message: string;
    type?: 'INFORMATIVE' | 'CRITICAL';
    buttonText?: string;
    /** ms, ou 'PERSISTENT' para nao fechar sozinho. */
    duration?: number | 'PERSISTENT';
    onClose?: (result: SnackbarCloseResult) => void;
};

function openSnackbar({message, type = 'INFORMATIVE', buttonText, duration, onClose}: OpenSnackbarParams): void {
    let fechadoPorBotao = false;

    toast.custom(
        (id) => (
            <div
                data-slot="snackbar"
                className={cn(
                    'flex min-h-12 w-full items-center justify-between gap-4 rounded-mistica-popup px-4 py-3.5 sm:min-w-90',
                    type === 'CRITICAL'
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
                            fechadoPorBotao = true;
                            toast.dismiss(id);
                            onClose?.({action: 'BUTTON'});
                        }}
                    >
                        {buttonText}
                    </button>
                ) : null}
            </div>
        ),
        {
            duration:
                duration === 'PERSISTENT' ? Infinity : (duration ?? (buttonText ? 10000 : 5000)),
            onAutoClose: () => onClose?.({action: 'TIMEOUT'}),
            onDismiss: () => {
                if (!fechadoPorBotao) {
                    onClose?.({action: 'DISMISS'});
                }
            },
        }
    );
}

/** Hook com a mesma assinatura do Mistica original. */
function useSnackbar(): {openSnackbar: typeof openSnackbar} {
    return {openSnackbar};
}

function SnackbarProvider() {
    return (
        <Toaster
            position="bottom-center"
            gap={8}
            toastOptions={{unstyled: true, className: 'w-full flex justify-center'}}
        />
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export {SnackbarProvider, openSnackbar, useSnackbar};
