document.cookie = `activeWorkspace=${window.intitalWorkspace.id}`

window.ws = new WebSocket('ws://localhost:8080')
const {store} = require('./store')

window.ws.onmessage = function (ev) {
  console.info(ev)
  const data = JSON.parse(ev.data)
  if (!data.action)
    return

  data.type = 'ws'
  store.dispatch(data)
}
