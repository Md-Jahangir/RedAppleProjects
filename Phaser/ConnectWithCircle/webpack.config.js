const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, './src/js/Main.js'),

    module: {},

    plugins: [
        new CopyPlugin({
            patterns: [
                { from: 'src/assets', to: 'assets' },
                { from: 'src/lib', to: 'lib' },
                { from: 'src/style.css', to: 'style.css' }
            ],
        }),

        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
    ],

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        clean: true, // auto-cleans dist/ before each build
    },

    devServer: {
        static: {
            directory: path.join(__dirname, 'src'),
            watch: true,
        },
        port: 8080,
        hot: true,
        open: true,
        client: {
            overlay: true,
        },
        server: {
            type: 'http',
        },
    },

    target: 'web',
    mode: 'development',
};
