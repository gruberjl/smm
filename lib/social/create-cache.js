const twitter = require('./twitter')

const debug = require('debug')('social:createCache')

const createCache = (workspace) => {
  debug('creating cache for %s', workspace.dbName)
  workspace.cache =  {connectors: []}

  const connectors = workspace.docs.filter(doc => doc.docType == 'connector')

  connectors.forEach(connector => {
    const workflows = workspace.docs.filter(doc => (
      doc.docType == 'workflow' &&
      connector._id == doc.connector
    ))

    if (workflows.length == 0) {
      debug('didn\'t find any workflows related to connector')
      return
    }

    const account = workspace.accounts.find(doc => doc._id == connector.account)

    const cache = {
      _id: connector._id,
      provider: connector.provider,
      name: connector.name
    }

    if (connector.provider == 'twitter') {
      const twitterCache = twitter.createCache(connector, workflows, account)
      Object.assign(cache, twitterCache)
    }

    workspace.cache.connectors.push(cache)
  })
}

module.exports = {createCache}
