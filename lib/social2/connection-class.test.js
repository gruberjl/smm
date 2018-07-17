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

describe('social:connection', () => {
  test('constructor', () => {
    const c = new Connection(newConnector(), newAccount())
    expect(c.connector).toEqual(newConnector())
    expect(c.account).toEqual(newAccount())
    expect(c.workflows).toEqual([])
    expect(c.channels).toEqual([])
  })

  test('updateChannel new', () => {
    const c = new Connection(newConnector(), newAccount())
    c.updateChannel({_id:'ch1'})
    expect(c.channels.length).toEqual(1)
    expect(c.channels[0]).toEqual({_id:'ch1'})
  })

  test('updateChannel update', () => {
    const c = new Connection(newConnector(), newAccount())
    c.updateChannel({_id:'ch1'})
    c.updateChannel({_id:'ch1', b:1})
    expect(c.channels.length).toEqual(1)
    expect(c.channels[0]).toEqual({_id:'ch1', b:1})
  })

  test('updateWorkflow new', () => {
    const c = new Connection(newConnector(), newAccount())
    c.updateWorkflow({_id:'wf1'})
    expect(c.workflows.length).toEqual(1)
    expect(c.workflows[0]).toEqual({_id:'wf1', nextRun:0})
  })

  test('updateWorkflow update', () => {
    const c = new Connection(newConnector(), newAccount())
    c.updateWorkflow({_id:'wf1'})
    c.updateWorkflow({_id:'wf1', b:1})
    expect(c.workflows.length).toEqual(1)
    expect(c.workflows[0]).toEqual({_id:'wf1', b:1, nextRun:0})
  })

  test('updateConnector connector', () => {
    const c = new Connection(newConnector(), newAccount())
    const connector2 = newConnector()
    connector2.name = 'new name'
    c.updateConnector(connector2)
    expect(c.connector.name).toEqual('new name')
  })

  test('updateDoc channel', () => {
    const c = new Connection(newConnector(), newAccount())
    c.updateChannel = jest.fn()
    c.updateDoc({docType:'channel'})
    expect(c.updateChannel.mock.calls.length).toEqual(1)
    expect(c.updateChannel.mock.calls[0]).toEqual([{docType:'channel'}])
  })

  test('updateDoc workflow', () => {
    const c = new Connection(newConnector(), newAccount())
    c.updateWorkflow = jest.fn()
    c.updateDoc({docType:'workflow'})
    expect(c.updateWorkflow.mock.calls.length).toEqual(1)
    expect(c.updateWorkflow.mock.calls[0]).toEqual([{docType:'workflow'}])
  })

  test('updateDoc connector', () => {
    const c = new Connection(newConnector(), newAccount())
    c.updateConnector = jest.fn()
    c.updateDoc({docType:'connector'})
    expect(c.updateConnector.mock.calls.length).toEqual(1)
    expect(c.updateConnector.mock.calls[0]).toEqual([{docType:'connector'}])
  })

  test('getWaitingWorkflows', () => {
    const c = new Connection(newConnector(), newAccount())
    c.workflows.push({_id:'a', nextRun:1})
    c.workflows.push({_id:'b', nextRun:0})
    c.workflows.push({_id:'c', nextRun:9999999999999})
    expect(c.getWaitingWorkflows()).toEqual([{_id:'b', nextRun:0}, {_id:'a', nextRun:1}])
  })
})
