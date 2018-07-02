/* eslint indent:0 */
const {buildQuery, buildLanguageFilter, buildResultTypeFilter, getData} = require('./tweet-search.js')
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
describe('buildQuery', () => {
  test('should return single query', () => {
    const connector = mockTweetWorkflow(mockConnector())
    expect(buildQuery(connector)).toBe('#h')
  })

  test('should concat queries', () => {
    const connector = mockTweetWorkflow(mockTweetWorkflow(mockConnector()), '#a')
    expect(buildQuery(connector)).toBe('#h #a')
  })
})

describe('buildLanguageFilter', () => {
  test('should return single language', () => {
    const connector = mockTweetWorkflow(mockConnector())
    expect(buildLanguageFilter(connector)).toBe('en')
  })

  test('should return "" on multiple languages', () => {
    const connector = mockTweetWorkflow(mockTweetWorkflow(mockConnector()), '', 'es')
    expect(buildLanguageFilter(connector)).toBe('')
  })

  test('should return "" on no language filter', () => {
    const connector = mockTweetWorkflow(mockTweetWorkflow(mockConnector(), '', ''), '', '')
    expect(buildLanguageFilter(connector)).toBe('')
  })
})

describe('buildResultTypeFilter', () => {
  test('should set to recent', () => {
    const connector = mockTweetWorkflow(mockConnector(), '', '', 'recent')
    expect(buildResultTypeFilter(connector)).toBe('recent')
  })

  test('should set to mixed', () => {
    const connector = mockTweetWorkflow(mockConnector(), '', '', 'mixed')
    expect(buildResultTypeFilter(connector)).toBe('mixed')
  })

  test('should set to popular', () => {
    const connector = mockTweetWorkflow(mockConnector(), '', '', 'popular')
    expect(buildResultTypeFilter(connector)).toBe('popular')
  })

  test('should set multiple popluars to popular', () => {
    const connector = mockTweetWorkflow(mockTweetWorkflow(mockConnector(), '', '', 'popular'), '', '', 'popular')
    expect(buildResultTypeFilter(connector)).toBe('popular')
  })

  test('should set multiple mixed to mixed', () => {
    const connector = mockTweetWorkflow(mockTweetWorkflow(mockConnector(), '', '', 'mixed'), '', '', 'mixed')
    expect(buildResultTypeFilter(connector)).toBe('mixed')
  })

  test('should set multiple recent to recent', () => {
    const connector = mockTweetWorkflow(mockTweetWorkflow(mockConnector(), '', '', 'recent'), '', '', 'recent')
    expect(buildResultTypeFilter(connector)).toBe('recent')
  })

  test('should set recent+popular to mixed', () => {
    const connector = mockTweetWorkflow(mockTweetWorkflow(mockConnector(), '', '', 'recent'), '', '', 'popular')
    expect(buildResultTypeFilter(connector)).toBe('mixed')
  })

  test('should set recent+mixed to mixed', () => {
    const connector = mockTweetWorkflow(mockTweetWorkflow(mockConnector(), '', '', 'recent'), '', '', 'mixed')
    expect(buildResultTypeFilter(connector)).toBe('mixed')
  })

  test('should set popular+mixed to mixed', () => {
    const connector = mockTweetWorkflow(mockTweetWorkflow(mockConnector(), '', '', 'popular'), '', '', 'mixed')
    expect(buildResultTypeFilter(connector)).toBe('mixed')
  })
})

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
