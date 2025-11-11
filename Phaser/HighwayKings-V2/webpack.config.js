const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const { dirname } = require('path');
const path = require('path');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const webpack = require("webpack");

module.exports = {
    entry: path.resolve(__dirname, './src/js/Main.js'),
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
        clean: true,
    },
    devServer: {
        hot: true,
        host: 'localhost',
        port: 8082,
        static: [
            {
                directory: path.join(__dirname, 'src'),
            }
        ]
    },
    target: "web",
    mode: "development",
    plugins: [
        new HtmlWebpackPlugin({ template: './src/index.html' }),
        new CopyPlugin({
            patterns: [
                { from: "src/assets", to: "assets" },
                { from: 'src/lib', to: "lib" },
                { from: 'src/style.css', to: path.resolve(__dirname, 'dist') },
            ],
        }),
        new MiniCSSExtractPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    module: {
        rules: [
        ]
    },
};