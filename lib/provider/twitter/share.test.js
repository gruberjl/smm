const secret = require('../../../secret')
const {post, unpost} = require('./post')
const {share, unshare} = require('./share')
const token = secret.twitterDoug.token
const tokenSecret = secret.twitterDoug.tokenSecret
const brianToken = secret.twitterBrian.token
const brianTokenSecret = secret.twitterBrian.tokenSecret

describe('provider', () => {
  describe('twitter', () => {
    describe('share', () => {
      let id

      beforeAll(async () => {
        const results = await post(brianToken, brianTokenSecret, 'Provider twitter share test')
        id = results.id
      })

      afterAll(async () => {
        await unpost(brianToken, brianTokenSecret, id)
      })

      test('create + delete', async () => {
        const results = await share(token, tokenSecret, id)
        expect(results.id).toBeDefined()
        expect(results.status).toEqual(200)
        expect(results.raw).toBeDefined()

        const dRes = await unshare(token, tokenSecret, id)
        expect(dRes.id).toBeDefined()
        expect(dRes.status).toEqual(200)
        expect(dRes.raw).toBeDefined()
      })
    })
  })
})
