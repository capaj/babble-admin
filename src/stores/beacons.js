import {observable, computed} from 'mobx'
import fetch from 'whatwg-fetch'
import config from 'config'

function beacon (json) {
  const obs = observable(json)

  setInterval(() => { // fake live updating the data
    const incr = Math.round(Math.random()) * 2 - 1
    if (obs.users.current + incr >= 0) {
      obs.users.current += incr
      if (incr > 0) {
        obs.users.total += incr
      }
    }
  }, 2000)
  obs.changeStatus = (enabled) => {
    console.log('changing status to', enabled)
    obs.active = enabled
    return obs.update()
  }
  obs.update = () => {
    // todo call PUT to server
    return Promise.resolve(null)
  }
  return obs
}

const beacons = observable([])
Promise.resolve([
  {
    "name": "Kavarna The Farm",
    "uuid": "EDD1EBEAC04E5DEFA017-0BDB87539B67",
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
    "uuid": "EDD1EBEAC04E5DEFA017-0BDB87539B67",
    "label": "xgDa",
    "active": false,
    "category": "tram",
    "users": {
      "current": 2,
      "total": 200
    },
    "stationary": true,
    "latitude": 14.4160084,
    "longitude": 50.1010032
  }, {
    "name": "Brno salina",
    "uuid": "EDD1EBEAC04E5DEFA017-0BDB87539B67",
    "label": "feFfD",
    "active": false,
    "category": "train",
    "users": {
      "current": 3,
      "total": 634
    },
    "stationary": true,
    "latitude": 14.4160084,
    "longitude": 50.1010032
  }
]).then((json) => {
  json.forEach((item) => {
    beacons.push(beacon(item))
  })
})

export default beacons
