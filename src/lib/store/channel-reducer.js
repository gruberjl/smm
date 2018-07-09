let workflows = []

const channel = (oldState={}, action) => {
  if (action.type=='WORKSPACE_CHANGE') {
    const state = Object.assign({}, oldState)
    const channels = action.docs.filter((doc) => doc.docType=='channel')
    workflows = action.docs.filter((doc) => doc.docType=='workflow')
    channels.forEach(channel => {
      if (!state[channel.dbName]) state[channel.dbName] = {docs:[]}
    })
    return state
  }

  if (action.type=='CHANNEL_CHANGE') {
    const state = Object.assign({}, oldState)
    const channel = action.channel
    const docs = action.docs.map(doc => {
      doc.workflow = workflows.find(w => w._id == doc.workflow._id)
      return doc
    })
    state[channel.dbName].docs = docs
    return state
  }

  return oldState
}

module.exports = {channel}
