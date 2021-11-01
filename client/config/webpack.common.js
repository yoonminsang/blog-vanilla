const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
    clean: true,
    assetModuleFilename: 'assets/[hash][ext][query]',
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js'],
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: '> 1%, not dead',
                  useBuiltIns: 'usage',
                  corejs: { version: '3.16' },
                },
              ],
            ],
          },
        },
        exclude: /(node_modules)/,
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      // favicon: './public/favicon.png',
    }),
    new CompressionPlugin(),
  ],
};
