const {TwitterConnection} = require('./twitter-connection-class')
const {Connection} = require('./connection-class')

const newConnector = () => {
  return {
    docType: 'connector',
    name: 'Twitter @gruberjl',
    account: { _id: 'a1' },
    provider: 'twitter',
    accountName: 'gruberjl',
    image: 'https://pbs.twimg.com/profile_images/828784665083465728/4ungbkuP_normal.jpg',
    _id: 'c1',
  }
}

const newAccount = () => {
  return {
    _id: 'a1',
    token: 't1',
    tokenSecret: 'ts1',
    provider: 'twitter'
  }
}

describe('social:TwitterConnection', () => {
  test('Should extend Connection', () => {
    expect(new TwitterConnection()).toBeInstanceOf(Connection)
  })

  test('constructor', () => {
    const c = new TwitterConnection(newConnector(), newAccount())
    expect(c.searchLimits.callsPerCycle).toEqual(12)
    expect(c.searchLimits.cycleStart/1000).toBeCloseTo((new Date()).getTime()/1000, 1)
    expect(c.searchLimits.cycleLength).toEqual(60000)
    expect(c.searchLimits.callsLeftOnCycle).toEqual(12)
  })

  test('resetLimits (no change)', () => {
    const c = new TwitterConnection(newConnector(), newAccount())
    const before = c.searchLimits.cycleStart
    c.resetLimits()
    expect(c.searchLimits.cycleStart).toEqual(before)
  })

  test('resetLimits', () => {
    const c = new TwitterConnection(newConnector(), newAccount())
    c.searchLimits.cycleStart = (new Date(2018,1,1)).getTime()
    const now = (new Date()).getTime()
    c.resetLimits()
    expect(c.searchLimits.cycleStart).toBeGreaterThanOrEqual(now)
  })

  test.only('getData', async () => {
    const c = new TwitterConnection(newConnector(), newAccount())
    c.workflows.push({_id:'a', nextRun:1, action:'search'})
    await c.getData()
    expect(c.searchLimits.callsLeftOnCycle).toEqual(11)
    expect(c.workflows).toEqual([{_id:'a', nextRun:1, action:'search'}])
  })
})
