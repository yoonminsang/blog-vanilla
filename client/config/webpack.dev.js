const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    index: 'index.html',
    port: 9000,
    writeToDisk: true,
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/api/': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});
