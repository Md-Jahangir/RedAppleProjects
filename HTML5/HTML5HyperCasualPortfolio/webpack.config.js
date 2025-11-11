
const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { dirname } = require('path');
module.exports = {
    // entry: path.resolve(__dirname, './src/Main.js'),
    entry: path.resolve(__dirname, './src/js/Main.js'),
    module: {
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "src/images", to: "images" },
                { from: 'src/styles/style.css', to: path.resolve(__dirname, 'dist/styles') }
            ],
        }),
        new HtmlWebpackPlugin({ template: './src/index.html' })
    ],
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
    },
    devServer: {
        server: 'http',
        port: 8082,
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