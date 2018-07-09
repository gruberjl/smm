const channel = (oldState={}, action) => {
  if (action.type=='WORKSPACE_CHANGE') {
    const state = Object.assign({}, oldState)
    const channels = action.docs.filter((doc) => doc.docType=='channel')
    channels.forEach(channel => {
      if (!state[channel.dbName]) state[channel.dbName] = []
    })
    return state
  }

  if (action.type=='CHANNEL_CHANGE') {
    const state = Object.assign({}, oldState)
    const channel = action.channel
    state[channel.dbName].docs = action.docs
    return state
  }

  return oldState
}

module.exports = {channel}
