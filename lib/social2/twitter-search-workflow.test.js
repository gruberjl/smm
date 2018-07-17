const {TwitterSearchWorkflow} = require('./twitter-search-workflow')
jest.mock('../provider')
const {twitter} = require('../provider')

const tweet = () => ({
  id_str:'1',
  user: {name:'n'},
  extended_tweet: {full_text:'t'},
  created_at: '1/1/2018'
})

describe('social:twitter-search-workflow', () => {
  beforeEach(() => {
    twitter.search.mockClear()
    twitter.search = jest.fn(() => Promise.resolve([]))
  })

  test('constructor', () => {
    const w = new TwitterSearchWorkflow({_id:'1'}, 'a', 'b')
    expect(w.nextRun).toEqual(0)
    expect(w._id).toEqual('1')
    expect(w.workflow).toEqual({_id:'1'})
    expect(w.accessToken).toEqual('a')
    expect(w.tokenSecret).toEqual('b')
  })

  describe('no tweets returned', () => {
    test('getData', async () => {
      const w = new TwitterSearchWorkflow({_id:'a', filters:{}}, 'b', 'c')
      const r = await w.getData()
      expect(w.since_id).toBeUndefined()
      expect(r).toEqual([])
    })
  })

  describe('no popularity filter', () => {
    test('getData', async () => {
      twitter.search = jest.fn(() => Promise.resolve([tweet()]))
      const w = new TwitterSearchWorkflow({_id:'a', filters:{}}, 'b', 'c')
      const previousNextRun = w.nextRun
      const r = await w.getData()
      expect(w.nextRun > previousNextRun).toEqual(true)
      expect(twitter.search.mock.calls.length).toEqual(1)
      expect(r.length).toEqual(1)
      expect(r[0]._id).toEqual('twitter:1')
    })
  })

  describe('with popularity filter', () => {
    test('getData', async () => {
      const t1 = tweet()
      t1.user.followers_count = 100
      const t2 = tweet()
      t2.user.followers_count = 1
      twitter.search = jest.fn(() => Promise.resolve([t1, t2]))
      const w = new TwitterSearchWorkflow({_id:'a', filters:{fromPopularity:'10'}}, 'b', 'c')
      const previousNextRun = w.nextRun
      const r = await w.getData()
      expect(w.nextRun > previousNextRun).toEqual(true)
      expect(twitter.search.mock.calls.length).toEqual(1)
      expect(r.length).toEqual(1)
      expect(r[0]._id).toEqual('twitter:1')
    })
  })
})
