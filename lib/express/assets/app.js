

const setWorkspace = (workspace) => {
  window.workspace = workspace
  addChannelsToDom(workspace.channels)
}

const emptyElement = (id) => {
  const element = document.getElementById(id)
  while(element.firstChild){
    element.removeChild(element.firstChild)
  }
}

const addChannelsToDom = (channels) => {
  const channelsContainer = document.getElementById('channels-container')

  emptyElement('channels-container')

  Object.keys(channels).forEach((key) => {
    const a = document.createElement('a')
    const linkText = document.createTextNode(channels[key].name)
    a.appendChild(linkText)
    a.title = channels[key].name
    a.href = `#channel/${channels[key].name}`
    channelsContainer.appendChild(a)
  })
}

window.onload = () => {
  const socket = io()

  socket.on('tweet', (msg) => {
    console.log(msg)
  })

  socket.on('workspace', (workspace) => {
    setWorkspace(workspace)
  })
}
