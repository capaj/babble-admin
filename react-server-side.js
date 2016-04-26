import koa from 'koa'
import React from "react"
import { match, RoutingContext } from 'react-router'
import routes from "./src/App"
import koaStatic from 'koa-static'
const server = koa()

server.use(function *(next) {
  match({ routes, location: this.request.url }, (error, redirectLocation, renderProps) => {
    console.log(renderProps)
    if (error) {
      this.status = 500
      this.body = error.message
    } else if (redirectLocation) {
      this.status = 302
      this.redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      this.status = 200
      const reactString = React.renderToString(<RoutingContext {...renderProps} />)
      this.body = `
    <!doctype html>
    <html>
      <head>
        <title>Admin</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css">
      </head>
      <body>
        ${reactString}
        <script src="/static/bundle.js"></script>
      </body>
    </html>
      `
    } else {
      this.status = 404
      this.body ='Not found'
    }
  })
  yield next
})

// server.use(koaStatic('.'))

export default server
