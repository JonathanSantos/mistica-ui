import path from 'node:path';
import type {StorybookConfig} from '@storybook/react-webpack5';

import {MisticaTokensPlugin} from '../scripts/mistica-tokens-webpack-plugin.mjs';

const config: StorybookConfig = {
    stories: ['../src/stories/**/*.mdx', '../src/stories/**/*.stories.@(ts|tsx)'],
    addons: [
        '@storybook/addon-webpack5-compiler-swc',
        '@storybook/addon-docs',
        '@storybook/addon-a11y',
    ],
    framework: {
        name: '@storybook/react-webpack5',
        options: {},
    },
    core: {
        disableTelemetry: true,
    },
    swc: () => ({
        jsc: {
            transform: {react: {runtime: 'automatic'}},
        },
    }),
    webpackFinal: async (webpackConfig) => {
        webpackConfig.resolve ??= {};
        webpackConfig.resolve.alias = {
            ...webpackConfig.resolve.alias,
            '@': path.resolve(import.meta.dirname, '../src'),
        };

        // Tailwind v4 entra pelo PostCSS: acrescenta o postcss-loader na
        // regra de CSS padrao do Storybook (style-loader + css-loader)
        for (const rule of webpackConfig.module?.rules ?? []) {
            if (
                rule &&
                typeof rule === 'object' &&
                rule.test instanceof RegExp &&
                rule.test.test('arquivo.css') &&
                Array.isArray(rule.use)
            ) {
                rule.use.push('postcss-loader');
            }
        }

        webpackConfig.plugins ??= [];
        webpackConfig.plugins.push(new MisticaTokensPlugin());
        return webpackConfig;
    },
};

export default config;
