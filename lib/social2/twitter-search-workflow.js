const {twitter} = require('../provider')
const {tweetsToMessages} = require('./tweets-to-messages')

class TwitterSearchWorkflow {
  constructor(workflow, accessToken, tokenSecret) {
    this.nextRun = 0
    this.workflow = workflow
    this.accessToken = accessToken
    this.tokenSecret = tokenSecret
  }

  get query() {
    const f = this.workflow.filters
    const query = {tweet_mode:'extended', count:100}
    if (   f.language   ) query.lang = f.language
    if (    f.search    ) query.q = f.search
    if (  f.resultType  ) query.result_type = f.resultType
    if (!f.includeShares) query.q = `${query.q} -filter:retweets`
    if (this.since_id) query.since_id = this.since_id
    return query
  }

  set sinceId(tweet) {
    this.since_id = tweet.id_str
  }

  updateNextRun() {
    this.nextRun = (new Date()).getTime() + 60000
  }

  filterMessages(messages) {
    const fromPopularity = this.workflow.filters.fromPopularity
    if (!fromPopularity) return messages

    return messages.filter(msg => msg.from.followersCount > fromPopularity)
  }

  async getData() {
    this.updateNextRun()
    const tweets = await twitter.search(this.accessToken, this.tokenSecret, this.query)
    if (tweets.length == 0) return tweets
    this.sinceId = tweets[0]
    const messages = tweetsToMessages(tweets, {_id:this.workflow._id})
    return this.filterMessages(messages)
  }
}

module.exports = {TwitterSearchWorkflow}
