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
      'react': 'src/React',
      'react-dom': 'src/ReactDOM'
    },
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
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
