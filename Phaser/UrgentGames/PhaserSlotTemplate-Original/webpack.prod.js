const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const WebpackObfuscator = require('webpack-obfuscator');

module.exports = {
	entry: path.resolve(__dirname, './src/entry.js'),
	module: {
		rules: [
			{
				test: /\.(js)$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			}
		]
	},	
	resolve: {
		extensions: ['*', '.js']
	},
	output: {
		path: path.resolve(__dirname, './dist/production'),
		filename: 'bundle.js',
	},
	devServer: {
		contentBase: path.resolve(__dirname, './dist/production'),
	},
	plugins: [
		new CopyPlugin({
			patterns: [
				{ from: 'assets', to: path.resolve(__dirname, 'dist/production/assets') },
				{ from: 'index.html', to: path.resolve(__dirname, 'dist/production') },
				{ from: 'style.css', to: path.resolve(__dirname, 'dist/production') }
			],
		}),
		new WebpackObfuscator ({}, [])
	],
	mode: "production"
};