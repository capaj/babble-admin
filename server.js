const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./webpack.config')
const React = require('react')
require('babel-register')
const app = require('./src/App')
const server = require('./react-server-side')
const port = process.env.PORT || 3000

// console.log(ReactDOMServer.renderToString(React.createElement(app.default)))
if (process.env.NODE_ENV !== 'production') {
  new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true
  }).listen(port, function (err, result) {
    if (err) {
      return console.log(err)
    }

    console.log('Listening at http://localhost:3000/')
  })
} else {
  server.default.listen(port)
}
