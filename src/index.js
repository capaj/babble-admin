import { AppContainer } from 'react-hot-loader'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import fb from './stores/facebook'

window.fb = fb
const rootEl = document.getElementById('root')
ReactDOM.render(
  <AppContainer component={App} />,
  rootEl
)

if (module.hot) {
  module.hot.accept('./App', () => {
    ReactDOM.render(
      <AppContainer component={require('./App').default}/>,
      rootEl
    )
  })
}
