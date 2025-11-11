const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
module.exports = {
    entry: path.resolve(__dirname, "./src/js/main.js"),
    module: {
        rules: [

        ]
    },
    plugins: [

        new CopyPlugin({
            patterns: [
                { from: "src/assets", to: "assets" },
                { from: 'src/style.css', to: path.resolve(__dirname, 'dist') }
            ],
        }),
        new HtmlWebpackPlugin({ template: './src/index.html' }),
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