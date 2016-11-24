var path = require('path')

module.exports = {
  entry: './src/index',
  output: {
    path: path.join(__dirname, 'lib'),
    filename: 'bundle.js',
    libraryTarget: 'var',
    library: 'WorkfloComponents'
  },
  resolve: {
    root: path.resolve(__dirname),
    alias: {
      'react': path.join(__dirname, 'src', 'React'),
      'react-dom': path.join(__dirname, 'src', 'ReactDOM')
    },
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/,
        include: __dirname
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
        exclude: /node_modules/,
        include: __dirname
      },
    ]
  }
}
