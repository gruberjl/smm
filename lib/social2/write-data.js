const {bulkDocs} = require('../database/server')

const groupByWorkflow = (messages) => {
  const groups = messages.reduce((acc, val) => {
    if (!acc[val.workflow._id]) acc[val.workflow._id] = []
    acc[val.workflow._id].push(val)
    return acc
  }, {})

  return groups
}

const groupByChannel = (item, groups) => {
  const channelGroups = Object.keys(groups).reduce((acc, key) => {
    const workflow = item.workspace.find(doc => doc._id == key)
    const channel = item.workspace.find(doc => doc._id == workflow.channel)
    if (!acc[channel.dbName]) acc[channel.dbName] = []
    acc[channel.dbName] = acc[channel.dbName].concat(groups[key])
    return acc
  }, {})

  return channelGroups
}

const writeToDb = (channelGroups) => {
  const promises = Object.keys(channelGroups).map(key =>
    bulkDocs(key, channelGroups[key])
  )

  return Promise.all(promises)
}

const writeData = (item, messages) => {
  const groups = groupByWorkflow(messages)
  const channelGroups = groupByChannel(item, groups)
  return writeToDb(channelGroups)
}

module.exports = {writeData}
