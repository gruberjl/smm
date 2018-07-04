const PouchDB = require('pouchdb')
const secret = require('../../secret.js')
const debug = require('debug')('social:writeData')

const groupByWorkflow = (messages) => {
  const groups = messages.reduce((acc, val) => {
    if (!acc[val.workflow._id]) acc[val.workflow._id] = []
    acc[val.workflow._id].push(val)
    return acc
  }, {})

  return groups
}

const groupByChannel = (workspace, groups) => {
  const channelGroups = Object.keys(groups).reduce((acc, key) => {
    const workflow = workspace.docs.find(doc => doc._id == key)
    const channel = workspace.docs.find(doc => doc._id == workflow.channel)
    if (!acc[channel.dbName]) acc[channel.dbName] = []
    acc[channel.dbName] = acc[channel.dbName].concat(groups[key])
    return acc
  }, {})

  return channelGroups
}

const writeToDb = (channelGroups) => {
  const promises = Object.keys(channelGroups).map(key => {
    debug('Writing %i messages to the %s database', channelGroups[key].length, key)
    const db = new PouchDB(`http://${secret.dbAdmin}:${secret.dbPassword}@10.0.75.1:5984/${key}`)

    return db.bulkDocs(channelGroups[key])
      .then(responses => {
        const alreadyExisted = responses.filter(res => res.status == 409).length
        const saved = responses.filter(res => res.ok).length
        const other = responses.filter(res => res.status != 409 && !res.ok)
        debug('Items saved to %s db:', key)
        debug('  %i saved', saved)
        debug('  %i already existed', alreadyExisted)
        debug('  %i had unknown error', other.length)
        if (other.length > 0)
          debug('%O', other)
      })
      .catch(err => {
        debug('Error saving items to %s db', key)
        debug('%O', err)
      })
      .then(res => {
        db.close()
        return res
      })
  })

  return Promise.all(promises)
}

const writeData = (workspace, messages) => {
  const groups = groupByWorkflow(messages)
  const channelGroups = groupByChannel(workspace, groups)
  return writeToDb(channelGroups)
}

module.exports = {writeData}
