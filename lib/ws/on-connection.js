const WebSocket = require('ws')
const {redisSocket} = require('../db')
const clients = []

const onMessage = (ws) => (message) => {
  const data = JSON.parse(message)
  console.info(`received message: ${message}`)

  switch (data.action) {
  case 'AUTHENTICATE':
    console.info('setting client in array')
    clients.push({ws, workspaceId: data.workspaceId})
  }
}

const sendWorkspace = (ws, workspace) => {
  const data = JSON.stringify({action:'WORKSPACE_UPDATED', workspace})
  ws.send(data)
}

const send = (action, data, ws) => {
  console.log('Sending workspace to client')
  if (ws.readyState === WebSocket.OPEN) {
    const message = JSON.stringify(Object.assign({action}, data))
    ws.send(message)
    return true
  }

  return false
}

const onConnection = (ws) => {
  ws.on('message', onMessage(ws))
}

redisSocket.on('WORKSPACE_UPDATED', (workspace) => {
  clients.forEach((client, idx) => {
    const isAlive = send('WORKSPACE_UPDATED', {workspace}, client.ws)
    if (!isAlive) {
      clients.splice(idx, 1)
    }
  })
})

module.exports = {onConnection, sendWorkspace}
