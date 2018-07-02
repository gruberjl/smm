const Twitter = require('twitter')
const tweetSearch = require('./tweet-search.js')
const secret = require('../../../secret.js')

const setupProvider = (connector) => {
  connector.provider = {
    client: new Twitter({
      consumer_key: secret.twitterApiKey,
      consumer_secret: secret.twitterApiSecret,
      access_token_key: connector.account.token,
      access_token_secret: connector.account.tokenSecret
    }),
    tweetSearch: {
      lastRun: 0,
      filter: {
        q: tweetSearch.buildQuery(connector),
        lang: tweetSearch.buildLanguageFilter(connector),
        resultType: tweetSearch.buildResultTypeFilter(connector)
      }
    }
  }
}

const getData = (connector) => {
  tweetSearch.getData(connector)
}

module.exports = {setupProvider, getData}
