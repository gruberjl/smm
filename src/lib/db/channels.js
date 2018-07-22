const {watchDb} = require('../database')
const workspace = require('./workspace')
const activeChannels = new Map()

const startChannel = (store, channel) => {
  if (channel.dbName && !activeChannels.has(channel._id)) {
    const emitter = watchDb(channel.dbName)

    emitter.on('change', docs => {
      const action = {type:'CHANNEL_CHANGE', docs, channel}
      store.dispatch(action)
    })

    emitter.on('diff', docs => {
      const action = {type:'CHANNEL_DIFF', docs, channel}
      store.dispatch(action)
    })

    activeChannels.set(channel._id, {channel, emitter})
  }
}

const stopChannel = (channel) => {
  if (!activeChannels.has(channel._id)) {
    const item = activeChannels.get(channel._id)
    item.emitter.emit('close')
    item.delete(channel._id)
  }
}

const start = (store) => {
  workspace.getEmitter().on('diff', (docs) => {
    const channels = docs.filter(doc => doc.docType=='channel')
    channels.forEach(channel => {
      startChannel(store, channel)
      stopChannel(channel)
    })
  })
}

module.exports = {start}
