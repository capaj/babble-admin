import React from 'react'
import Switch from 'rc-switch'
import {observer} from 'mobx-react'
import 'rc-switch/assets/index.css'
import _ from 'lodash'

export default observer((props) => {
  const propsToPass = _.omit(props, ['model', 'name'])
  return <Switch {...props}/>
})
