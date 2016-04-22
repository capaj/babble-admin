import React from 'react'
import { Button, Row, Col, Well, Table } from 'react-bootstrap'
import BeaconSwitch from './components/BeaconSwitch'
import beacons from './stores/beacons'
import {observer} from 'mobx-react'


export default observer(function Layout ({children}) {
  return (
    <div className="container-fluid">
      <h1>Your beacons</h1>
      <div>
        <Table responsive >
          <thead>
            <tr>
              <th>Enable/disable</th>
              <th>Label</th>
              <th>Category</th>
              <th>Description</th>
              <th>Current users/total</th>
              <th>Last known location</th>
            </tr>
          </thead>
          <tbody>
            {beacons.map((beac) => {
              return <tr key={beac.label}>
                <td>
                  <BeaconSwitch defaultChecked={beac.active} beacon={beac}/>
                </td>
                <td>{beac.label}</td>
                <td>{beac.category}</td>
                <td>{beac.name}</td>
                <td>{beac.users.current}/{beac.users.total}</td>
                <td><a href='http://maps.google.com'>{beac.latitude}, {beac.longitude}</a></td>
              </tr>
            })}
          </tbody>
        </Table>
      </div>
      <Button bsStyle='success'>Add</Button>
    </div>
  )
})
