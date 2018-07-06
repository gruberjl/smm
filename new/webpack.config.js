const {join} = require('path')

module.exports = {
  entry: './src/app/index.tsx',
  mode: 'development',
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  output: {
    filename: 'bundle.js',
    path: join(__dirname, 'assets')
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' }
    ]
  }
}
