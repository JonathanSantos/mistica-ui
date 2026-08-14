import path from 'node:path';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import {MisticaTokensPlugin} from './scripts/mistica-tokens-webpack-plugin.mjs';

export default (env, argv) => {
    const dev = argv.mode !== 'production';

    return {
        mode: dev ? 'development' : 'production',
        entry: './src/main.tsx',
        output: {
            path: path.resolve(import.meta.dirname, 'dist'),
            filename: dev ? '[name].js' : 'assets/[name].[contenthash].js',
            publicPath: '/',
            clean: true,
        },
        devtool: dev ? 'eval-source-map' : 'source-map',
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
            alias: {
                '@': path.resolve(import.meta.dirname, 'src'),
            },
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'swc-loader',
                        options: {
                            jsc: {
                                parser: {syntax: 'typescript', tsx: true},
                                transform: {
                                    react: {runtime: 'automatic', development: dev, refresh: dev},
                                },
                                target: 'es2022',
                            },
                        },
                    },
                },
                {
                    // Tailwind v4 entra pelo PostCSS (@tailwindcss/postcss)
                    test: /\.css$/,
                    use: [
                        dev ? 'style-loader' : MiniCssExtractPlugin.loader,
                        {loader: 'css-loader', options: {importLoaders: 1}},
                        'postcss-loader',
                    ],
                },
                {
                    test: /\.(svg|png|jpe?g|gif|woff2?)$/,
                    type: 'asset/resource',
                },
            ],
        },
        plugins: [
            new MisticaTokensPlugin(),
            new HtmlWebpackPlugin({template: './index.html'}),
            ...(dev
                ? [new ReactRefreshWebpackPlugin()]
                : [
                      new MiniCssExtractPlugin({filename: 'assets/[name].[contenthash].css'}),
                      new CopyWebpackPlugin({patterns: [{from: 'public', to: '.'}]}),
                  ]),
        ],
        devServer: {
            port: 5173,
            hot: true,
            historyApiFallback: true,
            static: {directory: path.resolve(import.meta.dirname, 'public')},
        },
        performance: {hints: false},
    };
};
