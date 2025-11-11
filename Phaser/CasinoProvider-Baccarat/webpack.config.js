const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
    entry: path.resolve(__dirname, "./src/js/Main.js"),
    module: {
        rules: [

        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            CANVAS_RENDERER: JSON.stringify(true),
            WEBGL_RENDERER: JSON.stringify(true)
        }),
        new CopyPlugin({
            patterns: [
                { from: "src/assets", to: "assets" },
                { from: "src/lib", to: "lib" },
                { from: "src/css", to: "css" },
            ],
        }),
        new HtmlWebpackPlugin({ template: './src/index.html' }),
    ],
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
    },
    devServer: {
        open: true,
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
    optimization: {
        minimize: true,

        minimizer: [new TerserPlugin(
            {
                test: /\.js(\?.*)?$/i,
            },
            {
                terserOptions: {
                    compress: true,
                }
            }
        )],
    },
    target: "web",
    mode: "development",
};