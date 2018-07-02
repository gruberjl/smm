const channelDbs = (oldState={}, action) => {
  let state = oldState

  if (action.type == 'SET_WORKSPACE') {
    state = Object.assign({}, oldState)
    action.docs.filter(doc => doc.docType == 'channel')
      .forEach(channel => {
        state[channel.dbName] = {messages:[]}
      })
  } else if (action.type=='WORKSPACE_UPDATED' && action.doc.docType == 'channel' && !state[action.doc.dbName]) {
    state = Object.assign({}, oldState)
    state[action.doc.dbName] = {messages:[]}
  } else if (action.type=='CHANNELS_DB_ADD_MESSAGES') {
    state = Object.assign({}, oldState)
    state[action.dbName].messages = [].concat(state[action.dbName].messages, action.docs)
  }

  return state
}

module.exports = {channelDbs}
