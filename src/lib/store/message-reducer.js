const clone = require('clone')

const updateChannels = (workspaceDocs, msgChannels) => {
  const channels = workspaceDocs.filter((doc) => doc.docType=='channel')
  channels.forEach(channel => {
    if (!msgChannels[channel.dbName]) msgChannels[channel.dbName] = []
  })
}

const newInteraction = (channels, interaction) => {
  Object.values(channels).forEach(channel => {
    const msg = channel.find(msg => msg._id == interaction.messageId)
    if (msg && interaction.docType == 'like') {
      msg.liked.push(interaction)
    }
  })
}

const newMessages = (channel, messages, interactions) => {
  messages.forEach(message => {
    const filteredInteractions = interactions.filter(interaction => message._id == interaction.messageId)
    const likes = filteredInteractions.filter(i => i.docType == 'like')
    message.liked = [].concat(message.liked, likes)
  })
}

const setWorkflowsOnMessages = (messages, workflowDocs) => {
  const workflows = workflowDocs.filter((doc) => doc.docType=='workflow')
  messages.forEach(message => {
    message.workflow = workflows.find(w => w._id == message.workflow._id)
  })
}

const mergeDocs = (docs, newDocs) => {
  newDocs.forEach(doc => {
    const idx = docs.findIndex(d => d._id == doc._id)
    if (idx > -1)
      docs.splice(idx, 1, doc)
    else
      docs.push(doc)
  })
}

const messages = (oldState={channels:{},interactions:[], workspaceDocs:[]}, action) => {
  if (action.type=='WORKSPACE_CHANGE') {
    const state = clone(oldState)
    updateChannels(action.docs, state.channels)
    state.workspaceDocs = action.docs
    return state
  }

  if (action.type=='INTERACTIONS_DIFF') {
    const state = clone(oldState)
    action.docs.forEach(interaction => {
      newInteraction(state.channels, interaction)
    })
    mergeDocs(state.interactions, action.docs)
    return state
  }

  if (action.type=='CHANNEL_DIFF') {
    const state = clone(oldState)
    const channel = state.channels[action.channel.dbName]
    newMessages(channel, action.docs, state.interactions)
    setWorkflowsOnMessages(action.docs, state.workspaceDocs)
    mergeDocs(channel, action.docs)
    return state
  }

  return oldState
}

module.exports = {messages}
