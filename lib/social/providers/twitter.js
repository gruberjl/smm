const Twitter = require('twitter')
const secret = require('../../../secret.js')

class TwitterProvider {

  static createTweetQuery(connector) {
    let query = ''

    if (connector.actions.tweet) {
      connector.actions.tweet.workflows.forEach(workflow => {
        query = query + workflow.doc.filters.search + ' '
      })
    }

    return query.trim()
  }

  static createLang(connector) {
    const language = new Set()

    if (connector.actions.tweet) {
      connector.actions.tweet.workflows.forEach(workflow => {
        if (workflow.doc.filters.language) {
          language.add(workflow.doc.filters.language)
        }
      })
    }

    if (language.size == 1)
      return Array.from(language)[0]

    return ''
  }

  constructor(connector) {
    this.tweetLastRun = 0
    this.connector = connector
    this.tweetFilter = {
      q: TwitterProvider.createTweetQuery(connector),
      lang: TwitterProvider.createLang(connector)
    }

    this.client = new Twitter({
      consumer_key: secret.twitterApiKey,
      consumer_secret: secret.twitterApiSecret,
      access_token_key: connector.account.token,
      access_token_secret: connector.account.tokenSecret
    })
  }

  tweet() {
    this.client.get('search/tweets', this.tweetFilter).then(res => {
      console.log(res)
    }).catch(err => console.log(err))
  }
}

const setupProvider = (connector) => {
  connector.provider = new TwitterProvider(connector)
}

module.exports = {setupProvider}
