const secret = require('../../../secret')
const {search} = require('./search')
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
  })
})
