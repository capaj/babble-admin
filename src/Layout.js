import React from 'react'
import { Button, Table } from 'react-bootstrap'
import beacons from './stores/beacons'
import {observer} from 'mobx-react'
import {observable} from 'mobx'
import BeaconRow from './components/BeaconRow'
import { Modal, FormGroup, ControlLabel, FormControl, Glyphicon, Navbar, Nav, NavItem } from 'react-bootstrap'
import NotificationSystem from 'react-notification-system'

const state = observable({
  showModal: false,
  selected: {}
})

let notifSystem = null

export default observer(function Layout ({children}) {
  return <div>
    <Navbar style={{
      backgroundColor: '#43de0a'
    }}> <Navbar.Header>
      <Navbar.Brand>
        <object style={{
          height: 69,
          marginBottom: -8,
          marginLeft: -7
        }} data='images/logo-white-full.svg' type='image/svg+xml'>
        </object>
      </Navbar.Brand>
    </Navbar.Header>
      <Nav style={{
        marginTop: 6
      }}>
        <NavItem eventKey={1} href='/'>Your beacons</NavItem>
      </Nav>
    </Navbar>
    <div className='container'>
      <NotificationSystem ref={(notifs) => {
        if (notifs) {
          notifSystem = notifs
        }
      }}/>
      <div>
        <Table responsive style={{
          backgroundColor: 'white'
        }}>
          <thead>
            <tr>
              <th>State</th>
              <th>Label</th>
              <th>Category</th>
              <th>Description</th>
              <th>Current users/total</th>
              <th>Last known location</th>
            </tr>
          </thead>
          <tbody>
            {beacons.map((beac) => {
              return <BeaconRow notifs={notifSystem} key={beac.label} beacon={beac} onEdit={(beacon) => {
                state.selected = beacon
                state.showModal = true
              }}/>
            })}
          </tbody>
        </Table>
      </div>
      <Button bsStyle='success'>
        <Glyphicon glyph='glyphicon glyphicon-plus-sign'/>Add new beacon
      </Button>
      <Modal show={state.showModal}>
        <Modal.Header>
          <Modal.Title>Edit beacon {state.selected.label}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <FormGroup>
            <ControlLabel>Category</ControlLabel>
            <FormControl type='text' placeholder='e.g. Train'
              value={state.selected.category}/>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Description</ControlLabel>
            <FormControl type='text' placeholder='e.g. under the 2nd seat in the back'
              value={state.selected.name}/>
          </FormGroup>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={() => {
            state.showModal = false
          }}>Close</Button>
          <Button bsStyle='primary' onClick={() => {
            state.selected.update().then(() => {
              notifSystem.addNotification({
                message: 'Beacon saved',
                level: 'success'
              })
            }, (err) => {
              notifSystem.addNotification({
                message: 'Beacon save failed',
                level: 'error'
              })
            })
            state.showModal = false
          }}>Save changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  </div>
})
