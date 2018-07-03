const twitter = require('./twitter')
const debug = require('debug')('social:twitter')

const setProviders = (workspace) => {
  workspace.connectors.forEach(connector => {
    if (connector.doc.provider == 'twitter') {
      twitter.setupProvider(connector)
    }
  })

  return workspace
}

const getData = (connector) => {
  if (connector.provider.name == 'twitter') {
    debug('getData for %s', connector.doc.name)
    return twitter.getData(connector)
  }
}

module.exports = {setProviders, getData}
