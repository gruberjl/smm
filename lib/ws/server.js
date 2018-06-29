const WebSocket = require('ws')
const cookie = require('cookie')
const {redisSocket} = require('../db')
const activeWorkspaces = {}

const verifyClient = (info) => {
  console.info('authenticating')
  if (info && info.req && info.req.headers && info.req.headers.cookie) {
    const cookies = cookie.parse(info.req.headers.cookie)
    if (cookies && cookies.activeWorkspace) {
      info.req.activeWorkspace = cookies.activeWorkspace
      return true
    }
  }

  return false
}

const server = new WebSocket.Server({ port: 8080, verifyClient, clientTracking: true })

server.on('connection', (ws, req) => {
  console.log('client connected')
  ws.activeWorkspace = req.activeWorkspace
  clientConnected(ws.activeWorkspace)

  ws.on('message', (message) => {
    const data = JSON.parse(message)
    console.info(`received message: ${message}`)
    console.info(ws.activeWorkspace)
    console.info(data)
    console.log('')
  })

  ws.on('close', (code, err) => {
    console.log('closing')
    console.log(ws.activeWorkspace)
    clientDisconnected(ws.activeWorkspace)
    console.log(code)
    console.log(err)
  })
})

const broadcast = (workspaceId, action, data) => {
  server.clients.forEach((client) => {
    console.log('broadcasting to client')
    if (client.activeWorkspace == workspaceId && client.readyState === WebSocket.OPEN) {
      console.log('found open socket client')
      const message = JSON.stringify(Object.assign({action}, {data}))
      client.send(message)
    }
  })
}

const clientConnected = (workspaceId) => {
  console.info('client connected', workspaceId)
  if (activeWorkspaces[workspaceId])
    activeWorkspaces[workspaceId] = 0
  else
    activeWorkspaces[workspaceId]++
}

const clientDisconnected = (workspaceId) => {
  if (activeWorkspaces[workspaceId] > 1)
    activeWorkspaces[workspaceId]--
  else
    delete activeWorkspaces[workspaceId]
}

redisSocket.on('WORKSPACE_UPDATED', (data) => {
  if (Object.keys(activeWorkspaces).includes(data.workspace.id)) {
    broadcast(data.workspace.id, 'WORKSPACE_UPDATED', {workspace: data.workspace})
  }
})

module.exports = {server, clientConnected, clientDisconnected}
