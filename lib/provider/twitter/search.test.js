const secret = require('../../../secret')
const {search, createQueryFromWorkflow} = require('./search')
const token = secret.twitterDoug.token
const tokenSecret = secret.twitterDoug.tokenSecret

describe('provider', () => {
  describe('twitter', () => {
    describe('search', () => {
      test('should return tweets', async () => {
        const results = await search(token, tokenSecret, {q:'@gruberjl'})
        expect(Array.isArray(results)).toEqual(true)
        expect(results.status).toEqual(200)
      })
    })

    describe('createQueryFromWorkflow', () => {
      test('should set everything', () => {
        const q = createQueryFromWorkflow({filters:{language:'en', search:'se', resultType:'recent', includeShares:true}}, '0', '1')
        expect(q).toEqual({count: 100, lang: 'en', max_id: '1', q: 'se', result_type: 'recent', since_id: '0', tweet_mode: 'extended'})
      })

      test('should set nothing', () => {
        const q = createQueryFromWorkflow({filters:{search:'ss'}})
        expect(q).toEqual({count: 100, q:'ss -filter:retweets', tweet_mode: 'extended'})
      })
    })
  })
})
