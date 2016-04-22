import React from 'react'
import {observer} from 'mobx-react'
import BeaconSwitch from './BeaconSwitch'
import { Modal, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'

export default observer((props) => {
  const {beacon} = props
  return <tr>
    <td>
      <BeaconSwitch defaultChecked={beacon.active} beacon={beacon}/>
    </td>
    <td>{beacon.label}</td>
    <td onClick={() => {
      props.onEdit(beacon)
    }}>{beacon.category}</td>
    <td onClick={() => {
      props.onEdit(beacon)
    }}>{beacon.name}</td>
    <td>{beacon.users.current}/{beacon.users.total}</td>
    <td><a href='http://maps.google.com'>{beacon.latitude}, {beacon.longitude}</a></td>
  </tr>
})
