const channelDbs = (oldState={}, action) => {
  const state = Object.assign({}, oldState)

  if (action.type=='CHANNEL_DB_CHANGE') {
    if (!state[action.dbName])
      state[action.dbName] = {dbName: action.dbName}
    state[action.dbName].status = action.status
  }

  return state
}

module.exports = {channelDbs}
