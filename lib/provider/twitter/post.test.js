const secret = require('../../../secret')
const {post, unpost} = require('./post')
const token = secret.twitterDoug.token
const tokenSecret = secret.twitterDoug.tokenSecret

describe('provider', () => {
  describe('twitter', () => {
    describe('post', () => {
      test('create + delete', async () => {
        const results = await post(token, tokenSecret, 'Provider twitter post test')
        expect(results.id_str).toBeDefined()
        const dRes = await unpost(token, tokenSecret, results.id_str)
        expect(dRes.id_str).toBeDefined()
      })
    })
  })
})
