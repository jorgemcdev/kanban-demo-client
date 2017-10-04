const webpack = require('webpack');
const path = require('path');

module.exports = {
  devServer: {
    hot: false,
    contentBase: 'dist/public',
    compress: false,
    port: 8080,
    stats: 'none',
    historyApiFallback: true,
    open: true
  }
};
