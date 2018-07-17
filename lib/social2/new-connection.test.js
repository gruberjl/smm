const {newConnection} = require('./new-connection')
const {TwitterConnection} = require('./twitter-connection-class')

describe('social:newConnection', () => {
  test('return TwitterConnection', () => {
    const c = newConnection({provider:'twitter'}, {})
    expect(c).toBeInstanceOf(TwitterConnection)
  })
})
