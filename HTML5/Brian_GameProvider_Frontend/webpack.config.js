
const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { dirname } = require('path');
module.exports = {
    entry: {
        index: path.resolve(__dirname, './src/Main.js'),
        pastIndex: path.resolve(__dirname, './src/pastResultMain.js'),
    },
    module: {
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "src/app/assets", to: "assets" },
                { from: 'src/app/styles/style.css', to: path.resolve(__dirname, 'dist') },
                { from: 'src/app/styles/spine-player.js', to: path.resolve(__dirname, 'dist') },
                { from: 'src/app/styles/spine-player.css', to: path.resolve(__dirname, 'dist') },
                { from: 'src/app/styles/pastResult.css', to: path.resolve(__dirname, 'dist') },
                { from: 'src/app/lib', to: 'lib' }
            ],
        }),
        // new HtmlWebpackPlugin({ template: './src/index.html' })
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            chunks: ['index']
        }),
        new HtmlWebpackPlugin({
            template: './src/pastResult.html',
            filename: 'pastResult.html',
            chunks: ['pastIndex']
        })
    ],
    output: {
        path: path.resolve(__dirname, './dist'),
        // filename: 'bundle.js',
        filename: '[name].bundle.js',
    },
    devServer: {
        server: 'http',
        port: 8080,
        hot: true,
        static: [
            {
                directory: path.join(__dirname, 'src'),
            }
        ],
        client: {
            overlay: true,
        }
    },
    target: "web",
    mode: "development",
};