

const setWorkspace = (workspace) => {
  window.workspace = workspace
  Object.keys(window.workspace.channels).forEach((key) => {
    window.workspace.channels[key].messages = []
  })
  addChannelsToDom(workspace.channels)
}

const emptyElement = (id) => {
  const element = document.getElementById(id)
  while (element.firstChild) {
    element.removeChild(element.firstChild)
  }
}

const addMessage = (message) => {
  console.dir(message)
  const channelName = message.workflow.channel
  const channelMessages = window.workspace.channels[channelName].messages
  channelMessages.push(message)
  addMessageToDom(message)
}

const isChannelOpen = (channel) => window.location.hash.substr(1) == `channel/${channel}`

const addMessageToDom = (message) => {
  const channel = message.workflow.channel

  if (isChannelOpen(channel)) {
    addCardToMessagesContainer(message)
  }
}

const addCardToMessagesContainer = (message) => {
  const card = document.createElement('div')
  card.classList.add('message-card')
  card.classList.add('stack')
  card.id = message.id

  const cardHeader = document.createElement('div')
  cardHeader.classList.add('message-card-header')
  cardHeader.classList.add('columnar')
  cardHeader.id = message.id

  const fromDisplayName = document.createElement('span')
  fromDisplayName.classList.add('message-display-name')
  const fromDisplayNameText = document.createTextNode(message.event.from.displayName)
  fromDisplayName.appendChild(fromDisplayNameText)

  const fromAccount = document.createElement('span')
  fromAccount.classList.add('message-from-account')
  const fromAccountText = document.createTextNode(message.event.from.account)
  fromAccount.appendChild(fromAccountText)

  const messageEl = document.createElement('span')
  fromAccount.classList.add('message-text')
  const messageText = document.createTextNode(message.event.message)
  messageEl.appendChild(messageText)

  card.appendChild(fromDisplayName)
  card.appendChild(fromAccount)
  card.appendChild(messageEl)

  document.getElementById('messages-container').appendChild(card)
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

  socket.on('message', addMessage)

  socket.on('workspace', (workspace) => {
    setWorkspace(workspace)
  })

  loadMain()
}

const loadMain = () => {

}

window.onhashchange = loadMain
