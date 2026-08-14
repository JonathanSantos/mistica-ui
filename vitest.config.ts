import path from 'node:path';
import {defineConfig} from 'vitest/config';

// O build do app e do Storybook usa webpack; o Vitest continua com o
// pipeline proprio dele (esbuild) — este arquivo so existe para os testes.
export default defineConfig({
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
