const twitter = require('./twitter.js')

const setProviders = (workspace) => {
  workspace.connectors.forEach(connector => {
    if (connector.doc.provider == 'twitter') {
      twitter.setupProvider(connector)
    }
  })
  
  return workspace
}

module.exports = {setProviders}
