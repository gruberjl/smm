/* eslint indent: 0 */

const {TwitterInteraction} = require('./twitter-interaction-class.js')

describe('TwitterInteraction', () => {
  test('should return TwitterInteraction', () => {
    expect(typeof TwitterInteraction).toEqual('function')
    expect(new TwitterInteraction()).toBeInstanceOf(TwitterInteraction)
  })
})
