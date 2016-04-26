'use strict'
const path = require('path')
const webpack = require('webpack')
const plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  })
]
let entry = []
if (process.env.NODE_ENV === 'production') {
  plugins.concat([
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin()
  ])
} else {
  entry.concat([
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server'
  ])
  plugins.push(new webpack.HotModuleReplacementPlugin())
}
entry.push('./src/index')

module.exports = {
  devtool: 'eval',
  entry: entry,
  output: {
    path: path.join(__dirname, 'static'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: plugins,
  resolve: {
    alias: {
      config: path.join(__dirname, 'config', process.env.NODE_ENV || 'development')
    }
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src')
      },
      {test: /\.css$/, loader: 'style-loader!css-loader'},
      {
        test: /\.less$/,
        loader: 'style!css!less'
      }
    ]
  }
}
