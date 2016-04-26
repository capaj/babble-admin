import React, { Component } from 'react'
import Layout from './Layout'
import { browserHistory, createMemoryHistory } from 'react-router'
import { Router, Route } from 'react-router'

const hist = typeof document !== 'undefined' ? browserHistory : createMemoryHistory()

// export default class App extends Component {
//   render () {
//     return
//   }
// }
 export default <Router history={hist}>
   <Route path='/' component={Layout}/>
 </Router>
