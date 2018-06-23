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

const sendWorkspace = (ws) => {
  const data = JSON.stringify({action:'WORKSPACE_UPDATE', workspace:{a:1}}).replace(/</g, '\\u003c')
  ws.send(data)
}

const onConnection = (ws) => {
  ws.on('message', onMessage(ws))
}

module.exports = {onConnection, sendWorkspace}
