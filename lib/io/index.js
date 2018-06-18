const {twitter} = require('../social')
const connections = []

const setup = (socket) => {
  console.log('a user connected')
  const connection = {
    twitter: {client: twitter.connect(), streams: []},
    socket
  }

  connections.push(connection)
  
  twitter.createStream(connection)

  socket.on('disconnect', () => {
    console.log('user disconnected')
    connections.pop()
  })
}

module.exports = {setup}
