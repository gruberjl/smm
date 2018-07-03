/* eslint indent:0 */
const {getData} = require('./tweet-search.js')
const mockTweets = require('./mock-tweets.js')

const mockTweetWorkflow = (connector, search='#h', language='en', resultType='recent') => {
  connector.actions.tweet.workflows.push({
    doc: {filters: {search, language, resultType}}
  })

  return connector
}

const mockProvider = (connector, tweets=[]) => {
  const mockGet = jest.fn()
  mockGet.mockReturnValueOnce(Promise.resolve({statuses: tweets}))

  connector.provider = {tweetSearch: {filter: {q:'#q', lang:'en', resultType:'recent'}}}
  connector.provider.client = {
    get: mockGet
  }

  return connector
}

const mockConnector = () => {
  const connector = {
    actions: { tweet: { workflows: [] } }
  }

  return connector
}

describe('providers', () => {
describe('twitter', () => {
describe('tweet-search', () => {

describe('getData', () => {
  test('should call Client with filter', async () => {
    const connector = mockProvider(mockConnector())
    const response = await getData(connector)
    expect(response).toEqual([])
    expect(connector.provider.client.get.mock.calls.length).toBe(1)
    expect(connector.provider.client.get.mock.calls[0][0]).toBe('search/tweets')
    expect(connector.provider.client.get.mock.calls[0][1]).toBe(connector.provider.tweetSearch.filter)
  })

  test('should set since_id', async () => {
    const connector = mockProvider(mockConnector(), mockTweets)
    const response = await getData(connector)
    expect(response.length).toEqual(1)
    expect(connector.provider.tweetSearch.filter.since_id).toBe(mockTweets[0].id_str)
  })
})
})
})
})
