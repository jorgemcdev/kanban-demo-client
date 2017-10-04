const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'eval',
  entry: {
    app: path.resolve(__dirname, './src/index.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist/public'),
    filename: '[name].bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(jpg|png|gif|svg)/,
        use: [
          'file-loader?name=[name].[ext]&publicPath=./&outputPath=images/',
          'image-webpack-loader'
        ]
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    hot: true
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: JSON.stringify('developement')
    }),
    new HtmlWebpackPlugin({
      title: 'Kanban',
      minify: {
        collapseWhitespace: false,
      },
      hash: false,
      template: path.join(__dirname, './src/index.html')
    }),
    new ExtractTextPlugin({
      filename: '[name].css',
      disable: true,
      allChunks: true
    }),
    new webpack.HotModuleReplacementPlugin(),  // enable HMR globally
    new webpack.NamedModulesPlugin() // prints more readable module names in console
  ]
};
