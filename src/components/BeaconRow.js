import React from 'react'
import {observer} from 'mobx-react'
import BeaconSwitch from './BeaconSwitch'
import { Modal, Button, FormGroup, ControlLabel, Glyphicon, FormControl } from 'react-bootstrap'

const cursorPointer = {
  cursor: 'pointer',
  // whiteSpace: 'nowrap',
  maxWidth: 140,
  overflow: 'hidden'
}

export default observer((props) => {
  const {beacon} = props
  const gmapLink = `https://www.google.com/maps/preview/@${beacon.longitude},${beacon.latitude},19.5z`
  let rowContent = <div>Loading...</div>
  if (beacon.users) {
    rowContent = <tr>
      <td>
        <BeaconSwitch defaultChecked={beacon.active} beacon={beacon} notifs={props.notifs}/>
      </td>
      <td>{beacon.label}</td>
      <td onClick={() => {
        props.onEdit(beacon)
      }} style={cursorPointer}>{beacon.category}</td>
      <td onClick={() => {
        props.onEdit(beacon)
      }} style={cursorPointer}>{beacon.name}</td>
      <td>{beacon.users.current} / {beacon.users.total}</td>
      <td><span style={{
        marginRight: 20
      }}>{beacon.latitude}, {beacon.longitude}</span>
        <Button bsStyle='success' onClick={() => {
          window.open(gmapLink)
        }}>
        <Glyphicon glyph='glyphicon glyphicon-map-marker'></Glyphicon>
        </Button></td>
    </tr>
  }
  return rowContent
})
