const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

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
		path: path.resolve(__dirname, './dist/development'),
		filename: 'bundle.js',
	},
	devServer: {
		contentBase: path.resolve(__dirname, './dist/development'),
	},
	plugins: [
		new CopyPlugin({
			patterns: [
				{ from: 'assets', to: path.resolve(__dirname, 'dist/development/assets') },
				{ from: 'index.html', to: path.resolve(__dirname, 'dist/development') },
				{ from: 'style.css', to: path.resolve(__dirname, 'dist/development') }
			],
		}),
	],
	mode: "development"
};