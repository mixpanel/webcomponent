var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

var webpackConfig = {
  entry: './index.js',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['env'],
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body',
      template: 'index.template.html',
    }),
  ],
  resolve: {
    alias: {
      'webcomponent': path.join(__dirname, '..', 'build'),
    },
  },
};

module.exports = webpackConfig;
