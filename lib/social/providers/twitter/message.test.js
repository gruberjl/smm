/* eslint indent:0 */
const {tweetsToMessages} = require('./message.js')
const mockTweets = require('./mock-tweets.js')

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

})
})
})
