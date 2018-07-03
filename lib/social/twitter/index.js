const Twitter = require('twitter')
const secret = require('../../../secret.js')
const search = require('./search.js')
const debug = require('debug')('social:twitter')

const getData = (connector) => {
  debug('getData for %s connector', connector.name)
  const client = new Twitter(connector.client)

  if (connector.search) {
    const {apiLimit, workflows} = connector.search
    return search.getData(client, apiLimit, workflows)
  }
}

const createCache = (connector, workflows, account) => {
  debug('creating cache for %s connector', connector.name)

  const cache = {
    client: {
      consumer_key: secret.twitterApiKey,
      consumer_secret: secret.twitterApiSecret,
      access_token_key: account.token,
      access_token_secret: account.tokenSecret
    }
  }

  const searchWorkflows = workflows.filter(w => w.action == 'search')

  if (searchWorkflows.length > 0) {
    debug('configuring search cache')
    const searchCache = search.createCache(connector, searchWorkflows)
    cache.search = searchCache
  }

  return cache
}

module.exports = {createCache, getData}
