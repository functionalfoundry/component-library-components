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

  resolve: {
    root: path.resolve(__dirname) + '/..',
    extensions: ['', '.js']
  },

  module: {
    loaders: [
      {
        test: /\.js/,
        loaders: ['babel'],
        include: [
          path.join(__dirname, 'src'),
        ]
      },
      {
        test: /\.css/,
        loaders: ['style-loader', 'css-loader'],
        exclude: path.join(__dirname, '../node_modules')
      },
      {
        test: /\.json?$/,
        loaders: ['raw']
      },
      {
        test: /\.png$/,
        loader: 'url',
        query: { limit: 8192, mimetype: 'image/png' }
      }
    ]
  }
}

module.exports = config
