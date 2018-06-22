const onConnection = (ws) => {
  ws.on('message', (message) => {
    console.log('received: %s', message)
  })

  const data = JSON.stringify({action:'WORKSPACE_UPDATE', workspace:{a:1}}).replace(/</g, '\\u003c')
  ws.send(data)
}

module.exports = {onConnection}
