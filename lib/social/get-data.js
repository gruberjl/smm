const twitter = require('./twitter')
const debug = require('debug')('social:getData')

const forConnector = (connector) => {
  if (connector.provider == 'twitter') {
    return twitter.getData(connector)
  }
}

const getData = (item) => {
  debug('Getting data for %s workspace', item.workspaceDoc.dbName)

  const connectorMessages = item.cache.connectors.map(connector => {
    return forConnector(connector)
  })

  return Promise.all(connectorMessages)
    .then(messageArrays => messageArrays.reduce((acc, curr) => [].concat(acc, curr), []))
}

module.exports = {getData}
