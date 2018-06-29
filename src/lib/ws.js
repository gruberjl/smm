document.cookie = `activeWorkspace=${window.intitalWorkspace.id}`

window.ws = new WebSocket('ws://localhost:8080')
const {store} = require('./store')

window.ws.onopen = function () {
  console.log('websocket is connected ...')
  const data = {action:'AUTHENTICATE', workspaceId: window.intitalWorkspace.id}
  window.ws.send(JSON.stringify(data))
}

window.ws.onmessage = function (ev) {
  console.info(ev)
  const data = JSON.parse(ev.data)
  if (!data.action)
    return

  store.dispatch({type:'ws', data})
}
