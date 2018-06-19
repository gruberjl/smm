const {twitter} = require('../social')
const connections = []
const db = require('../db')

const getWorkspace = () => db.workspace.read()

const sendWorkspace = (connection) => {
  connection.socket.emit('workspace', connection.workspace)
}

const setupWorkflows = (connection) => {
  const workspace = connection.workspace

  Object.keys(workspace.workflows).forEach((key) => {
    const workflow = workspace.workflows[key]
    const connector = workspace.connectors[workflow.connector]

    if (connector.platform == 'twitter') {
      twitter.createStream(connector.client, workflow, (event) => {
        connection.socket.emit('message', {workflow, event})
      })
    }
  })
}

const stopStreams = (connection) => {
  const workspace = connection.workspace

  Object.keys(workspace.workflows).forEach((key) => {
    const workflow = workspace.workflows[key]
    const connector = workspace.connectors[workflow.connector]

    if (connector.platform == 'twitter') {
      twitter.stopStream(workflow.stream)
    }
  })
}

const setupConnectors = (connection) => {
  const workspace = connection.workspace

  Object.keys(workspace.connectors).forEach((key) => {
    const connector = workspace.connectors[key]

    if (connector.platform == 'twitter') {
      connector.client = twitter.connect(connector.token, connector.secret)
    }
  })
}

const setup = (socket) => {
  console.log('a user connected')

  const connection = {
    twitter: {client: twitter.connect(), streams: []},
    socket,
    workspace: getWorkspace()
  }

  connections.push(connection)

  sendWorkspace(connection)
  setupConnectors(connection)
  setupWorkflows(connection)

  socket.on('disconnect', () => {
    console.log('user disconnected')
    stopStreams(connection)
    connections.pop()
  })
}

module.exports = {setup}
