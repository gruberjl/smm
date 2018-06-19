const {twitter} = require('../social')
const connections = []
const db = require('../db')
const uuid = require('uuid/v4')

const getWorkspace = () => db.workspace.read()

const sendWorkspace = (connection) => {
  connection.socket.emit('workspace', connection.workspace)
}

const setupWorkflows = (connection) => {
  const workspace = connection.workspace

  Object.keys(workspace.workflows).forEach((key) => {
    const workflow = workspace.workflows[key]
    const connector = workspace.connectors[workflow.connector]

    // if (connector.platform == 'twitter') {
    //   twitter.searchTweets(connector.client, workflow, (tweets) => {
    //     const events = tweets.map(
    //       (event) => Object.assign({}, {event}, {id:uuid()})
    //     )
    //
    //     connection.socket.emit('messages', {workflow, events})
    //   })
    //
    //   twitter.createStream(connector.client, workflow, (event) => {
    //     connection.socket.emit('message', {workflow, event, id: uuid()})
    //   })
    // }
  })
}

const stopStreams = (connection) => {
  const workspace = connection.workspace

  Object.keys(workspace.workflows).forEach((key) => {
    const workflow = workspace.workflows[key]
    const connector = workspace.connectors[workflow.connector]

    if (connector.platform == 'twitter' && workflow.stream) {
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
