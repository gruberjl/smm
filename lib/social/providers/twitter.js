const Twitter = require('twitter')
const PouchDB = require('pouchdb')
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

  static createMessages(tweets) {
    const messages = tweets.map(tweet => ({
      _id: `twitter:${tweet.id_str}`,
      provider:'twitter',
      raw: tweet,
      from: {
        displayName: tweet.user.name,
        account: tweet.user.screen_name,
        image: tweet.user.profile_image_url_https,
        description: tweet.user.description,
        url: tweet.user.url,
        followersCount: tweet.user.followers_count,
        isVerified: tweet.user.verified
      },
      parent: tweet.in_reply_to_status_id_str,
      isReply: Boolean(tweet.in_reply_to_status_id_str),
      isOriginal: !tweet.retweeted_status,
      message: tweet.text,
      time: tweet.created_at
    }))

    return messages
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

    connector.provider = this
  }

  static writeTweets(messages) {
    const db = new PouchDB(`http://${secret.dbAdmin}:${secret.dbPassword}@10.0.75.1:5984/channel0`)
    db.bulkDocs(messages).then(() => db.close())
  }

  setTweetCursor(messages) {
    this.tweetFilter.since_id = messages[messages.length-1].raw.id_str
  }

  tweet() {
    this.client.get('search/tweets', this.tweetFilter).then(res => {
      const messages = TwitterProvider.createMessages(res.statuses)
      this.setTweetCursor(messages)
      TwitterProvider.writeTweets(messages)
    }).catch(err => console.log(err))
  }

  getData() {
    this.tweet()
  }
}

const setupProvider = (connector) => {
  connector.provider = new TwitterProvider(connector)
}

module.exports = {setupProvider}
