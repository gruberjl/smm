const twitter = require('./twitter')
const twitterStream = require('./twitter/replies')
const debug = require('debug')('social:getData')

const forConnector = (item, connector) => {
  if (connector.provider == 'twitter') {
    return twitter.getData(connector)
      .then(messages => {
        if (messages && messages.length > 0) {
          debug('add %i messages to Twitter Stream', messages.length)
          twitterStream.addMessages(item, messages)
        }
        return messages
      })
  }
}

const getData = (item) => {
  debug('Getting data for %s workspace', item.workspaceDoc.dbName)

  const connectorMessages = item.cache.connectors.map(connector => {
    return forConnector(item, connector)
  })

  return Promise.all(connectorMessages)
    .then(messageArrays => messageArrays.reduce((acc, curr) => [].concat(acc, curr), []))
}

module.exports = {getData}
