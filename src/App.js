import React, { Component } from 'react'
import Layout from './Layout'
import { browserHistory } from 'react-router'
import { Router, Route } from 'react-router'

export default class App extends Component {
  render () {
    return <div>
      <Router history={browserHistory}>
        <Route path='/' component={Layout}/>
      </Router>
    </div>
  }
}
