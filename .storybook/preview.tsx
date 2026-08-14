import * as React from 'react';
import type {Decorator, Preview} from '@storybook/react-webpack5';

import {ThemeContextProvider} from '../src/components/ui/theme-context-provider';
import {aplicarCorNossa} from '../src/examples/lib/color';

import '../src/index.css';

/** Presets de cor de marca (os mesmos do lab de exemplos). */
const CORES: Record<string, string | null> = {
    vivo: null,
    azul: '#0B6EFD',
    verde: '#1E7D46',
    rosa: '#EB3D7D',
};

/**
 * Decorator global: aplica skin (data-skin), tema (via ThemeContextProvider,
 * que tambem monta SnackbarProvider e DialogRoot) e cor de marca em runtime.
 * O fundo da story usa o token de background para o dark mode ser visivel.
 */
const comTemaMistica: Decorator = (Story, contexto) => {
    const {skin, tema, cor} = contexto.globals;

    React.useEffect(() => {
        if (skin === 'vivo-new-system') {
            document.documentElement.dataset.skin = 'vivo-new-system';
        } else {
            delete document.documentElement.dataset.skin;
        }
    }, [skin]);

    React.useEffect(() => {
        aplicarCorNossa(CORES[cor as string] ?? null);
    }, [cor]);

    return (
        <ThemeContextProvider theme={{colorScheme: tema === 'escuro' ? 'dark' : 'light'}}>
            <div className="min-h-24 bg-mistica-background p-6 font-sans text-mistica-text-primary antialiased">
                <Story />
            </div>
        </ThemeContextProvider>
    );
};

const preview: Preview = {
    parameters: {
        layout: 'fullscreen',
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        docs: {
            // Painel "Code" com o fonte da story — o storybook do Mistica
            // original nao habilita; aqui e requisito.
            codePanel: true,
            toc: true,
        },
        options: {
            storySort: {
                order: ['Introdução', 'Componentes', 'Padrões', 'Layout', 'Utilitários'],
            },
        },
    },
    globalTypes: {
        skin: {
            description: 'Skin do design system',
            toolbar: {
                title: 'Skin',
                icon: 'paintbrush',
                items: [
                    {value: 'vivo', title: 'vivo (new-vivo)'},
                    {value: 'vivo-new-system', title: 'vivo-new-system (compacta)'},
                ],
                dynamicTitle: true,
            },
        },
        tema: {
            description: 'Esquema de cor',
            toolbar: {
                title: 'Tema',
                icon: 'contrast',
                items: [
                    {value: 'claro', icon: 'sun', title: 'Claro'},
                    {value: 'escuro', icon: 'moon', title: 'Escuro'},
                ],
                dynamicTitle: true,
            },
        },
        cor: {
            description: 'Cor de marca aplicada em runtime nos tokens',
            toolbar: {
                title: 'Cor de marca',
                icon: 'circlehollow',
                items: [
                    {value: 'vivo', title: 'Vivo (padrão)'},
                    {value: 'azul', title: 'Azul'},
                    {value: 'verde', title: 'Verde'},
                    {value: 'rosa', title: 'Rosa'},
                ],
                dynamicTitle: true,
            },
        },
    },
    initialGlobals: {
        skin: 'vivo',
        tema: 'claro',
        cor: 'vivo',
    },
    decorators: [comTemaMistica],
    tags: ['autodocs'],
};

export default preview;
