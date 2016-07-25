var path = require('path')

module.exports = {
  entry: './src/index',
  output: {
    path: path.join(__dirname, 'lib'),
    filename: 'bundle.js',
    publicPath: '/lib/',
    libraryTarget: 'var',
    library: 'WorkfloComponents'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [ 'babel' ],
        exclude: /node_modules/,
        include: __dirname
      }
    ]
  }
}
