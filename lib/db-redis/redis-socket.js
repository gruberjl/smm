const Redis = require('ioredis')
const secret = require('../../secret.js')
const listeners = []
let subscribed = true

const REDIS_SOCKET_DB = 2
const options = {
  port: secret.redisPort,
  host: secret.redisServerIP,
  family: 4,
  db: REDIS_SOCKET_DB
}

const redisSocketSub = new Redis(options)
const redisSocketPub = new Redis(options)

redisSocketSub.subscribe('WORKSPACE_UPDATED', (err) => {
  if (err) throw `error subscribing redisSocket: ${err}`
})

redisSocketSub.on('message', (channel, message) => {
  if (subscribed) {
    const data = JSON.parse(message)
    listeners.forEach((listener) => {
      if (channel == listener.channel) {
        listener.cb(data)
      }
    })
  }
})

const on = (channel, cb) => {
  listeners.push({channel, cb})
}

const publish = (channel, data) => {
  redisSocketPub.publish(channel, JSON.stringify(data))
}

const unsubscribe = () => { subscribed = false }
const subscribe = () => { subscribed = true }

const redisSocket = {on, publish, unsubscribe, subscribe}

module.exports = {redisSocket, redisSocketSub, redisSocketPub}
