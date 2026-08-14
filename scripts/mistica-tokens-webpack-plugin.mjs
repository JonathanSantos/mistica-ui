import {spawnSync} from 'node:child_process';
import path from 'node:path';

/**
 * Plugin webpack dos tokens Mistica: regenera os CSS de tokens no inicio do
 * build e sempre que um tokens/*.json muda no watch — editar um token vira
 * hot-reload instantaneo no browser (o CSS gerado muda e o HMR recarrega).
 */
const SKINS = [
    ['tokens/vivo.json', 'src/styles/mistica-vivo.css'],
    ['tokens/vivo-evolution.json', 'src/styles/mistica-vivo-evolution.css'],
    ['tokens/vivo-new-system.json', 'src/styles/mistica-vivo-new-system.css'],
];

class MisticaTokensPlugin {
    apply(compiler) {
        const raiz = compiler.context;
        const pastaTokens = path.resolve(raiz, 'tokens');

        const regenerar = () => {
            for (const [tokens, css] of SKINS) {
                const result = spawnSync('python3', ['scripts/generate-tokens.py', tokens, css], {
                    cwd: raiz,
                    stdio: 'inherit',
                });
                if (result.status !== 0) {
                    console.error(`[mistica-tokens] falha ao gerar ${css}`);
                }
            }
        };

        compiler.hooks.beforeRun.tap('MisticaTokensPlugin', regenerar);
        compiler.hooks.watchRun.tap('MisticaTokensPlugin', (comp) => {
            const mudados = comp.modifiedFiles;
            const tokenMudou =
                !mudados ||
                [...mudados].some((f) => f.startsWith(pastaTokens) && f.endsWith('.json'));
            if (tokenMudou) {
                regenerar();
            }
        });
        // faz o watcher do webpack observar a pasta tokens/
        compiler.hooks.afterCompile.tap('MisticaTokensPlugin', (compilation) => {
            compilation.contextDependencies.add(pastaTokens);
        });
    }
}

export {MisticaTokensPlugin};
