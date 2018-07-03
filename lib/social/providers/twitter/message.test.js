/* eslint indent:0 */
const {tweetsToMessages, setWorkflow} = require('./message.js')
const mockTweets = require('./mock-tweets.js')

const mockConnector = () => {
  const connector = {
    actions: { tweet: { workflows: [] } }
  }

  return connector
}

const mockTweetWorkflow = (connector, search='#h', language='en', resultType='recent') => {
  connector.actions.tweet.workflows.push({
    doc: {filters: {search, language, resultType}}
  })

  return connector
}

const mockMessage = () => {
  return {
    message: 'asdf #h l;akjsdf',
    raw: {
      lang: 'en',
      metadata: {
        result_type: 'recent'
      }
    }
  }
}

describe('providers', () => {
describe('twitter', () => {
describe('message', () => {

describe('tweetsToMessages', () => {
  test('should compose message', () => {
    const res = tweetsToMessages(mockTweets)
    const tw = mockTweets[0]
    const msg = res[0]
    expect(msg._id).toEqual(`twitter:${tw.id_str}`)
    expect(msg.provider).toEqual('twitter')
    expect(msg.raw).toEqual(tw)
    expect(msg.from.displayName).toEqual(tw.user.name)
    expect(msg.from.account).toEqual(tw.user.screen_name)
    expect(msg.from.image).toEqual(tw.user.profile_image_url_https)
    expect(msg.from.description).toEqual(tw.user.description)
    expect(msg.from.url).toEqual(tw.user.url)
    expect(msg.from.followersCount).toEqual(tw.user.followers_count)
    expect(msg.from.isVerified).toEqual(tw.user.verified)
    expect(msg.parent).toEqual(tw.in_reply_to_status_id_str)
    expect(msg.isReply).toEqual(Boolean(tw.in_reply_to_status_id_str))
    expect(msg.isOriginal).toEqual(!tw.retweeted_status)
    expect(msg.message).toEqual(tw.text)
    expect(msg.time).toEqual(tw.created_at)
  })
})

describe('setWorkflow', () => {
  test('should set workflow', () => {
    const connector = mockTweetWorkflow(mockConnector())

  })
})

})
})
})
