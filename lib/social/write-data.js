const {bulkDocs} = require('../database/server')
const debug = require('debug')('social:writeData')

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
  const promises = Object.keys(channelGroups).map(key => {
    debug('Writing %i messages to the %s database', channelGroups[key].length, key)
    return bulkDocs(key, channelGroups[key]).then(r => {
      const alreadyExisted = r.response.filter(res => res.status == 409).length
      const saved = r.response.filter(res => res.ok).length
      const other = r.response.filter(res => res.status != 409 && !res.ok)
      debug('Items saved to %s db:', key)
      debug('  %i saved', saved)
      debug('  %i already existed', alreadyExisted)
      debug('  %i had unknown error', other.length)
      if (other.length > 0)
        debug('%O', other)
    })
  })

  return Promise.all(promises)
}

const writeData = (item, messages) => {
  const groups = groupByWorkflow(messages)
  const channelGroups = groupByChannel(item, groups)
  return writeToDb(channelGroups)
}

module.exports = {writeData}
