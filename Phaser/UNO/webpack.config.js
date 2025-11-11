const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, './src/js/Main.js'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
    clean: true, // optional: clears old files in dist before build
  },

  module: {
    rules: [
      // you can add loaders here later if needed
    ],
  },

  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'src/assets', to: 'assets' },
        { from: 'src/style.css', to: 'style.css' },
        { from: 'plugins/SpinePlugin.min.js', to: 'SpinePlugin.min.js' },
      ],
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body',
    }),
  ],

  devServer: {
    static: {
      directory: path.join(__dirname, 'src'),
      watch: true,
    },
    compress: true,
    port: 8083,
    hot: true,
    client: {
      overlay: true,
      logging: 'info',
    },
    historyApiFallback: true,
  },

  target: 'web',
  mode: 'development',
};
