const {TwitterConnection} = require('./twitter-connection-class')

const newConnection = (connector, account) => {
  if (connector.provider == 'twitter')
    return new TwitterConnection(connector, account)
}

module.exports = {newConnection}
