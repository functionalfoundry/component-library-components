var path = require('path')
var webpack = require('webpack')
var config = {
  entry: [
    'webpack-hot-middleware/client',
    './src/index'
  ],

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
    publicPath: '/dist/'
  },

  devtool: 'source-map',

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      __TEST__: false
    })
  ],

  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: path.join(__dirname, '..', 'node_modules'),
        include: path.join(__dirname, '..')
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
        exclude: path.join(__dirname, '..', 'node_modules'),
        include: path.join(__dirname, '..')
      },
    ]
  }
}

module.exports = config
