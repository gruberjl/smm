const WebSocket = require('ws')
const {onConnection} = require('./on-connection.js')

let server

const setup = () => {
  server = new WebSocket.Server({ port: 8080 })
  server.on('connection', onConnection)
}

const get = () => {
  return server
}

module.exports = {get, setup}
