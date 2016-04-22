import React from 'react'
import {observer} from 'mobx-react'
import BeaconSwitch from './BeaconSwitch'
import { Modal, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'

const cursorPointer = {
  cursor: 'pointer'
}

export default observer((props) => {
  const {beacon} = props
  const gmapLink = `https://www.google.com/maps/preview/@${beacon.latitude},${beacon.longitude},8z`
  return <tr>
    <td>
      <BeaconSwitch defaultChecked={beacon.active} beacon={beacon}/>
    </td>
    <td>{beacon.label}</td>
    <td onClick={() => {
      props.onEdit(beacon)
    }} style={cursorPointer}>{beacon.category}</td>
    <td onClick={() => {
      props.onEdit(beacon)
    }} style={cursorPointer}>{beacon.name}</td>
    <td>{beacon.users.current} / {beacon.users.total}</td>
    <td><a href={gmapLink}>{beacon.latitude}, {beacon.longitude}</a></td>
  </tr>
})
