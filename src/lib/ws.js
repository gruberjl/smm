window.ws = new WebSocket('ws://localhost:8080')
window.listeners = []

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

  window.listeners.forEach((listener) => {
    if (data.action.match(listener.regex)) {
      listener.cb(data)
    }
  })
}

const on = (test, cb) => {
  const regex = new RegExp(test, 'g')
  window.listeners.push({regex, test, cb})
}

module.exports = {on}
