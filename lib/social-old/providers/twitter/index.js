const Twitter = require('twitter')
const tweetSearch = require('./tweet-search.js')
const secret = require('../../../../secret.js')

const getData = (connector) => {
  if (connector.actions.tweet)
    return tweetSearch.getData(connector)
}

const setupProvider = (connector) => {
  connector.provider = {
    name: 'twitter',
    client: new Twitter({
      consumer_key: secret.twitterApiKey,
      consumer_secret: secret.twitterApiSecret,
      access_token_key: connector.account.token,
      access_token_secret: connector.account.tokenSecret
    }),
    tweetSearch: {
      apiLimit: {
        callsPerCycle: 12,
        cycleStart: (new Date()).getTime(),
        cycleLength: 60000,
        callsThisCycle: 0
      }
    }
  }
}

module.exports = {setupProvider, getData}
