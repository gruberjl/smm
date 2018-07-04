const twitter = require('./twitter')
const debug = require('debug')('social:getData')

const forConnector = (connector) => {
  if (connector.provider == 'twitter') {
    return twitter.getData(connector)
  }
}

const forWorkspace = (workspace) => {
  debug('Getting data for %s workspace', workspace.dbName)

  const connectorMessages = workspace.cache.connectors.map(connector => {
    return forConnector(connector)
  })

  return Promise.all(connectorMessages)
    .then(messageArrays => messageArrays.reduce((acc, curr) => [].concat(acc, curr), []))
}

module.exports = {forWorkspace}
