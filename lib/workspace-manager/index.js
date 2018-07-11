const {watchDb, put, createDb} = require('../database/server')
const uuid = require('uuid/v4')
require('./interactions')
const debug = require('debug')('workspace-manager:setupChannel')

const setupChannel = (channel) => {
  const dbName = `channel-${uuid()}`
  createDb(dbName, 'channel').then(res => {
    if (res.error) debug('Error creating db: %O', res.error)

    channel.dbName = dbName
    put('workspace1', channel).then(putRes => {
      if (putRes.error) debug('Error configuring channel: %O', putRes.error)
    })
  })
}

watchDb('workspace1').on('change', (docs) => {
  const channelsRequiringSetup = docs.filter(doc => doc.docType == 'channel' && !doc.dbName)
  channelsRequiringSetup.forEach(setupChannel)
})
