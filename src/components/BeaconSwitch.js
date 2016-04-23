import React from 'react'
import Switch from 'rc-switch'
import {observer} from 'mobx-react'
import 'rc-switch/assets/index.css'
import _ from 'lodash'

export default observer((props) => {
  const propsToPass = _.omit(props, 'beacon')
  return <Switch onChange={(newStatus) => {
    props.beacon.changeStatus(newStatus).then(() => {
      props.notifs.addNotification({
        message: 'Beacon saved',
        level: 'success'
      })
    }, (err) => {
      props.notifs.addNotification({
        message: 'Beacon save failed',
        level: 'error'
      })
    })
  }} {...props}/>
})
