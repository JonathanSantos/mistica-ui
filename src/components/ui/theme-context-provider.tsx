import * as React from 'react';

import {DialogRoot} from '@/components/ui/dialogs';
import {SnackbarProvider} from '@/components/ui/snackbar';

/**
 * ThemeContextProvider de compatibilidade com o Mistica original.
 *
 * No nosso DS o tema vive em CSS (tokens + data-skin), entao este provider
 * nao carrega contexto — ele existe para que apps migrando do
 * @telefonica/mistica nao precisem mudar a raiz: aplica o colorScheme
 * (classe `dark`) e monta o SnackbarProvider e o DialogRoot, que no
 * original ficam dentro do provider deles.
 */
type ThemeConfig = {
    /** Aceito por compatibilidade; o skin real vem do CSS importado. */
    skin?: unknown;
    colorScheme?: 'light' | 'dark' | 'auto';
    i18n?: {locale?: string; phoneNumberFormattingRegionCode?: string};
};

function ThemeContextProvider({theme, children}: {theme?: ThemeConfig; children: React.ReactNode}) {
    const colorScheme = theme?.colorScheme ?? 'light';

    React.useEffect(() => {
        const aplicar = (escuro: boolean) => document.documentElement.classList.toggle('dark', escuro);

        if (colorScheme === 'auto') {
            const media = window.matchMedia('(prefers-color-scheme: dark)');
            aplicar(media.matches);
            const listener = (event: MediaQueryListEvent) => aplicar(event.matches);
            media.addEventListener('change', listener);
            return () => media.removeEventListener('change', listener);
        }

        aplicar(colorScheme === 'dark');
        return undefined;
    }, [colorScheme]);

    return (
        <>
            {children}
            <SnackbarProvider />
            <DialogRoot />
        </>
    );
}

/**
 * Stub de compatibilidade: no original, getVivoSkin() alimenta o provider;
 * aqui o skin vem do CSS, entao devolve so o nome.
 */
function getVivoSkin(): {name: 'Vivo'} {
    return {name: 'Vivo'};
}

// eslint-disable-next-line react-refresh/only-export-components
export {ThemeContextProvider, getVivoSkin, type ThemeConfig};
