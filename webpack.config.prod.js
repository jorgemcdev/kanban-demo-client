const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js',
    vendor: [
      'react', 'react-dom', 'react-router', 'react-router-redux',
      'redux', 'redux-form', 'redux-thunk'
    ]
  },
  output: {
    path: path.join(__dirname, './dist/public'),
    filename: '[name].bundle.js',
    publicPath: '/public/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
          publicPath: '/dist'
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
          publicPath: '/dist'
        })
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader?name=[name].[ext]&publicPath=./public/&outputPath=images/',
          'image-webpack-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify('production')
    }),
    new HtmlWebpackPlugin({
      title: 'Trello Clone',
      minify: {
        collapseWhitespace: true,
      },
      hash: false,
      template: './src/index.html'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: '2',
      filename: '[name].js',
    }),
    new ExtractTextPlugin({
      filename: '[name].css',
      disable: false,
      allChunks: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false,
        unused: true,
        dead_code: true,
      },
      output: {
        comments: false,
      },
      sourceMap: false,
    }),
    new webpack.NamedModulesPlugin(), // prints more readable module names in console
  ]
};
