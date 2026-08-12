import * as React from 'react';

import {ButtonDanger, ButtonLink, ButtonPrimary} from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

/**
 * alert / confirm / dialog imperativos, como no Mistica original.
 * Monte <DialogRoot/> uma vez na raiz do app (como o SnackbarProvider).
 */
type DialogParams = {
    title?: string;
    message: string;
    acceptText?: string;
    cancelText?: string;
    onAccept?: () => void;
    onCancel?: () => void;
    /** Botao de aceitar em vermelho (acoes destrutivas). */
    destructiveAction?: boolean;
};

type DialogInterno = DialogParams & {kind: 'alert' | 'confirm'};

let emitir: ((params: DialogInterno) => void) | null = null;

function alert(params: DialogParams): void {
    emitir?.({...params, kind: 'alert'});
}

function confirm(params: DialogParams): void {
    emitir?.({...params, kind: 'confirm'});
}

/** dialog() do Mistica = confirm com layout padrao. */
function dialog(params: DialogParams): void {
    confirm(params);
}

function DialogRoot() {
    const [atual, setAtual] = React.useState<DialogInterno | null>(null);
    const [aberto, setAberto] = React.useState(false);

    React.useEffect(() => {
        emitir = (params) => {
            setAtual(params);
            setAberto(true);
        };
        return () => {
            emitir = null;
        };
    }, []);

    if (!atual) {
        return null;
    }

    const fechar = (aceito: boolean) => {
        setAberto(false);
        if (aceito) {
            atual.onAccept?.();
        } else {
            atual.onCancel?.();
        }
    };

    return (
        <Dialog
            open={aberto}
            onOpenChange={(open) => {
                if (!open) {
                    fechar(false);
                }
            }}
        >
            <DialogContent showClose={false}>
                <DialogHeader>
                    {atual.title ? <DialogTitle>{atual.title}</DialogTitle> : null}
                    <DialogDescription>{atual.message}</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    {atual.kind === 'confirm' ? (
                        <ButtonLink onPress={() => fechar(false)}>{atual.cancelText ?? 'Cancelar'}</ButtonLink>
                    ) : null}
                    {atual.destructiveAction ? (
                        <ButtonDanger onPress={() => fechar(true)}>{atual.acceptText ?? 'Aceitar'}</ButtonDanger>
                    ) : (
                        <ButtonPrimary onPress={() => fechar(true)}>{atual.acceptText ?? 'Aceitar'}</ButtonPrimary>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export {DialogRoot, alert, confirm, dialog};
