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
      {
        test: /\.json$/,
        loader: 'json',
        include: [
          path.join(__dirname, 'node_modules', 'globals'),
          path.join(__dirname, 'node_modules', 'cheerio'),
          path.join(__dirname, 'node_modules', 'css-select', 'lib'),
          path.join(__dirname, 'node_modules', 'entities', 'maps')
        ]
      }
    ]
  }
}
