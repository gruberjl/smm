const {watchDb} = require('../database')
const activeChannels = []

const addChannel = (store, channel) => {
  const emitter = watchDb(channel.dbName)

  emitter.on('change', docs => {
    const action = {type:'CHANNEL_CHANGE', docs, channel}
    store.dispatch(action)
  })

  activeChannels.push({
    _id: channel._id,
    emitter
  })
}

const startChannels = (store, channels) => {
  const activeChannelIds = activeChannels.map(c => c._id)
  const newChannels = channels.filter(channel => !activeChannelIds.includes(channel._id) && channel.dbName)
  newChannels.forEach(channel => addChannel(store, channel))
}

const removeChannel = (channel) => {
  const idx = activeChannels.findIndex(c => c._id == channel._id)
  activeChannels[idx].emitter.emit('close')
  activeChannels.splice(idx, 1)
}

const stopChannels = (channels) => {
  const newChannelIds = channels.map(c => c._id)
  const removedChannels = activeChannels.filter(channel => !newChannelIds.includes(channel._id))
  removedChannels.forEach(channel => removeChannel(channel))
}

const channelMiddleware = store => next => action => {
  if (action.type=='WORKSPACE_CHANGE') {
    const channels = action.docs.filter(doc => doc.docType=='channel')
    startChannels(store, channels)
    stopChannels(channels)
  }

  return next(action)
}

module.exports = {channelMiddleware}
