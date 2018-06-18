const {twitter} = require('../social')
const connections = []

const setup = (socket) => {
  console.log('a user connected')
  connections.push({twitter: {client: twitter.connect()}})

  socket.on('disconnect', () => {
    console.log('user disconnected')
    connections.pop()
  })
}

module.exports = {setup}
