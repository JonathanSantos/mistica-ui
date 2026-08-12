/// <reference types="vitest/config" />
import {spawnSync} from 'node:child_process';
import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import {defineConfig, type Plugin} from 'vite';

const SKINS: Array<[tokens: string, css: string]> = [
    ['tokens/vivo.json', 'src/styles/mistica-vivo.css'],
    ['tokens/vivo-evolution.json', 'src/styles/mistica-vivo-evolution.css'],
    ['tokens/vivo-new-system.json', 'src/styles/mistica-vivo-new-system.css'],
];

/**
 * Regenera os CSS de tokens quando qualquer tokens/*.json muda.
 * Editar um token no JSON vira hot-reload instantaneo no browser.
 */
function misticaTokens(): Plugin {
    const regenerate = () => {
        for (const [tokens, css] of SKINS) {
            const result = spawnSync('python3', ['scripts/generate-tokens.py', tokens, css], {
                cwd: import.meta.dirname,
                stdio: 'inherit',
            });
            if (result.status !== 0) {
                console.error(`[mistica-tokens] falha ao gerar ${css}`);
            }
        }
    };

    return {
        name: 'mistica-tokens',
        buildStart() {
            regenerate();
        },
        configureServer(server) {
            server.watcher.add(path.resolve(import.meta.dirname, 'tokens'));
            server.watcher.on('change', (file) => {
                if (file.includes(`${path.sep}tokens${path.sep}`) && file.endsWith('.json')) {
                    console.log(`[mistica-tokens] ${path.basename(file)} mudou, regenerando...`);
                    regenerate();
                }
            });
        },
    };
}

// https://vite.dev/config/
export default defineConfig({
    plugins: [misticaTokens(), react(), tailwindcss()],
    resolve: {
        alias: {
            '@': path.resolve(import.meta.dirname, './src'),
        },
    },
    test: {
        environment: 'jsdom',
        setupFiles: './src/test/setup.ts',
        css: false,
    },
});
