import {observable, computed} from 'mobx'
import fetch from 'whatwg-fetch'
import config from 'config'

class Beacon {
  constructor (json) {
    const obs = observable(json)

    setInterval(() => {
      obs.users.current += 2
    }, 2000)
    return obs
  }
  changeStatus (enabled) {
    console.log('changing status to', enabled)
    this.active = enabled
  }
}

const beacons = observable([])
Promise.resolve([
  {
    "name": "Kavarna The Farm",
    "id": "EDD1EBEAC04E5DEFA017-0BDB87539B67",
    "label": "DjBx",
    "active": true,
    "category": "coffeshop",
    "users": {
      "current": 1,
      "total": 2
    },
    "stationary": true,
    "latitude": 14.4160084,
    "longitude": 50.1010032
  }, {
    "name": "Brno salina",
    "id": "EDD1EBEAC04E5DEFA017-0BDB87539B67",
    "label": "xgDa",
    "active": false,
    "category": "tram",
    "users": {
      "current": 1,
      "total": 2
    },
    "stationary": true,
    "latitude": 14.4160084,
    "longitude": 50.1010032
  }, {
    "name": "Brno salina",
    "id": "EDD1EBEAC04E5DEFA017-0BDB87539B67",
    "label": "feFfD",
    "active": false,
    "category": "train",
    "users": {
      "current": 1,
      "total": 2
    },
    "stationary": true,
    "latitude": 14.4160084,
    "longitude": 50.1010032
  }
]).then((json) => {
  json.forEach((beacon) => {
    beacons.push(new Beacon(beacon))
  })
})

export default beacons
