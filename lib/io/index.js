const {twitter} = require('../social')
const connections = []
const db = require('../db')

const sendWorkspace = (connection) => {
  const workspace = db.workspace.read()
  connection.socket.emit('workspace', workspace)
}

const setup = (socket) => {
  console.log('a user connected')
  const connection = {
    twitter: {client: twitter.connect(), streams: []},
    socket
  }

  connections.push(connection)
  sendWorkspace(connection)
  twitter.createStream(connection)

  socket.on('disconnect', () => {
    console.log('user disconnected')
    connections.pop()
  })
}

module.exports = {setup}
