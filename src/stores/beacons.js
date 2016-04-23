import {observable, computed} from 'mobx'
import 'whatwg-fetch'
import config from 'config'
import profile from './profile'

function beacon (json) {
  if (!json.users) {
    json.users = {
      current: 0,
      total: 0
    }
  } else {
    setInterval(() => { // fake live updating the data
      const incr = Math.round(Math.random()) * 2 - 1
      if (obs.users.current + incr >= 0) {
        obs.users.current += incr
        if (incr > 0) {
          obs.users.total += incr
        }
      }
    }, 2000)
  }
  const obs = observable(json)

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
console.log(profile.id)
fetch(`${config.api }/users/10208142238866391/beacons`)
// fetch(`${config.api }/users/${profile.id}/beacons`)
  .then(function (response) {
    return response.json()
  }).then(function (json) {
    json = json.concat([
      {
        "label": "Kavarna The Farm",
        "uuid": "EDD1EBEAC04E5DEFA017-0BDB87539B67",
        "name": "DjBx",
        "active": true,
        "category": "coffeshop",
        "users": {
          "current": 1,
          "total": 2
        },
        "stationary": true,
        "latitude": 14.160084,
        "longitude": 51.010032
      }, {
        "label": "Brno salina",
        "uuid": "EDD1EBEAC04E5DEFA017-0BDB87539B67",
        "name": "xgda",
        "active": false,
        "category": "tram",
        "users": {
          "current": 2,
          "total": 200
        },
        "stationary": true,
        "latitude": 15.084,
        "longitude": 49.32
      }, {
        "label": "Brno salina",
        "uuid": "EDD1EBEAC04E5DEFA017-0BDB87539B67",
        "name": "feFfD",
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
    ])
    json.forEach((item) => {
      beacons.push(beacon(item))
    })
  }).catch(function(ex) {
    console.error('parsing failed', ex)
  })

export default beacons
