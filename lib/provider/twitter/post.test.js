const secret = require('../../../secret')
const {post, unpost} = require('./post')
const token = secret.twitterDoug.token
const tokenSecret = secret.twitterDoug.tokenSecret

describe('provider', () => {
  describe('twitter', () => {
    describe('post', () => {
      test('create + delete', async () => {
        const results = await post(token, tokenSecret, 'Provider twitter post test')
        expect(results.id).toBeDefined()
        expect(results.status).toEqual(200)
        expect(results.raw).toBeDefined()
        const dRes = await unpost(token, tokenSecret, results.id)
        expect(dRes.id).toBeDefined()
        expect(dRes.status).toEqual(200)
        expect(dRes.raw).toBeDefined()
      })
    })
  })
})
