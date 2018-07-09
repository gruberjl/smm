/* eslint indent: 0 */
const {createCache} = require('./create-cache')
const {workspace, accounts, connectors} = require('../mock-docs/simple-workspace')

describe('social', () => {
describe('create-cache', () => {
  describe('empty workflow', () => {
    test('should return empty', () => {
      expect(createCache([], [])).toEqual({'connectors': []})
    })
  })

  describe('no workflows', () => {
    test('should return empty', () => {
      expect(createCache([{docType:'channel'}], [])).toEqual({'connectors': []})
    })
  })

  describe('simple-workspace', () => {
    test('should return connector', () => {
      const cache = createCache(workspace, accounts)
      expect(cache.connectors).toBeDefined()
      expect(cache.connectors.length).toEqual(1)
      expect(cache.connectors[0]._id).toEqual(connectors[0]._id)
    })

    test('should cache twitter client', () => {
      const cache = createCache(workspace, accounts)
      const client = cache.connectors[0].client
      expect(client.consumer_key).toBeDefined()
      expect(typeof client.consumer_key).toEqual('string')
      expect(client.consumer_secret).toBeDefined()
      expect(typeof client.consumer_secret).toEqual('string')
      expect(client.access_token_key).toEqual(accounts[0].token)
      expect(client.access_token_secret).toEqual(accounts[0].tokenSecret)
    })

    test('should set search', () => {
      const cache = createCache(workspace, accounts)
      expect(cache.connectors[0].search).toBeDefined()
    })

    test('should set apiLimit', () => {
      const cache = createCache(workspace, accounts)
      const apiLimit = cache.connectors[0].search.apiLimit
      expect(apiLimit.callsPerCycle).toEqual(12)
      expect(typeof apiLimit.cycleStart).toEqual('number')
      expect(apiLimit.cycleLength).toEqual(60000)
      expect(apiLimit.callsLeftOnCycle).toEqual(12)
    })

    test('should set workflows', () => {
      const cache = createCache(workspace, accounts)
      const workflows = cache.connectors[0].search.workflows
      expect(workflows.length).toEqual(1)
      expect(workflows[0]).toEqual({
        _id: '51fb0510-9c84-40fd-0004-000000000000',
        name: 'Twitter @Gruberjl to Office365',
        query:
         { tweet_mode: 'extended',
           count: 100,
           lang: 'en',
           q: '#office365 #microsoft -filter:retweets',
           result_type: 'recent' },
        nextRun: 0,
        filter: { fromPopularity: 1000 } })
    })
  })

  describe('no channel db', () => {
    test('should block workflows with channels not configured', () => {
      const w = workspace.slice()
      delete w[0].dbName
      const cache = createCache(w, accounts)
      expect(cache).toEqual({'connectors': []})
    })
  })
})
})
