/* eslint indent: 0 */
const {Workspace} = require('./workspace-class')
jest.mock('../../lib/database/server')
const DB = require('../../lib/database/server')
const {TwitterInteraction} = require('./twitter-interaction-class')

const workspaceDoc = () => ({
  dbName:'workspace1',
  interactionsDbName:'interactions1'
})

describe('Workspace', () => {
  const emit = jest.fn()
  const on = jest.fn()
  let watchDb, allDocs, createDb, put

  beforeEach(() => {
    allDocs = DB.allDocs.mockImplementation(() => [])
    watchDb = DB.watchDb.mockImplementation(() => ({emit, on}))
    createDb = DB.createDb.mockImplementation()
    put = DB.put.mockImplementation()
  })

  afterEach(() => {
    allDocs.mockClear()
    watchDb.mockClear()
    createDb.mockClear()
    put.mockClear()
    emit.mockClear()
    on.mockClear()
    // jest.resetModules()
  })

  test('should return Workspace', () => {
    expect(typeof Workspace).toEqual('function')
    expect(new Workspace(workspaceDoc())).toBeInstanceOf(Workspace)
  })

  describe('constructor', () => {
    test('should set workspaceDoc', () => {
      const d = workspaceDoc()
      const w = new Workspace(d)
      expect(w.workspaceDoc).toEqual(d)
    })

    test('should watch workspace and interaction db', () => {
      new Workspace(workspaceDoc())
      expect(watchDb.mock.calls.length).toEqual(2)
      expect(watchDb.mock.calls[0].length).toEqual(1)
      expect(watchDb.mock.calls[0][0]).toEqual('workspace1')
      expect(watchDb.mock.calls[1][0]).toEqual('interactions1')
    })

    test('should listen to change on workspace db', () => {
      const w = new Workspace(workspaceDoc())
      expect(on.mock.calls.length).toEqual(2)
      expect(on.mock.calls[0].length).toEqual(2)
      expect(on.mock.calls[0][0]).toEqual('change')
      expect(on.mock.calls[0][1]).toEqual(w.setWorkspaceDocs)
    })

    test('should listen to change on interaction db', () => {
      const w = new Workspace(workspaceDoc())
      expect(on.mock.calls.length).toEqual(2)
      expect(on.mock.calls[0].length).toEqual(2)
      expect(on.mock.calls[1][0]).toEqual('change')
      expect(on.mock.calls[1][1]).toEqual(w.setInteractions)
    })

    test('should set docs to []', () => {
      const w = new Workspace(workspaceDoc())
      expect(w.docs).toEqual([])
    })

    test('should set accounts to []', () => {
      const w = new Workspace(workspaceDoc())
      expect(w.docs).toEqual([])
    })

    test('should set interations to []', () => {
      const w = new Workspace(workspaceDoc())
      expect(w.interactions).toEqual([])
    })

    test('should set submittedInteractions to []', () => {
      const w = new Workspace(workspaceDoc())
      expect(w.submittedInteractions).toEqual([])
    })
  })

  describe('setWorkspaceDocs', () => {
    test('should set docs', () => {
      const w = new Workspace(workspaceDoc())
      w.setWorkspaceDocs([1])
      expect(w.docs).toEqual([1])
    })
  })

  describe('setInteractions', () => {
    test('should set docs', () => {
      const w = new Workspace(workspaceDoc())
      w.setInteractions([1])
      expect(w.interactions[0]).toBeInstanceOf(TwitterInteraction)
    })

    test('should call publishInteractions', () => {
      const w = new Workspace(workspaceDoc())
      w.publishInteractions = jest.fn()
      w.setInteractions([1])
      expect(w.publishInteractions.mock.calls.length).toEqual(1)
    })
  })

  describe('publishInteractions', () => {
    test('should set submittedInteractions', () => {
      const w = new Workspace(workspaceDoc())
      w.interactions.push({_id:'a'})
      w.interactions.push({_id:'b', published:(new Date()).toISOString()})
      w.interactions.push({_id:'c'})
      w.submittedInteractions.push('c')
      w.publishInteractions()
      expect(w.submittedInteractions.length).toEqual(2)
      expect(w.submittedInteractions[1]).toEqual('a')
    })
  })

  describe('get-channels', () => {
    test('should return []', () => {
      const w = new Workspace(workspaceDoc())
      expect(w.connectors).toEqual([])
    })

    test('should return channel', () => {
      const w = new Workspace(workspaceDoc())
      w.docs.push({docType:'channel'})
      w.docs.push({docType:'workflow'})
      expect(w.channels).toEqual([{docType:'channel'}])
    })
  })

  describe('get-connectors', () => {
    test('should return []', () => {
      const w = new Workspace(workspaceDoc())
      expect(w.connectors).toEqual([])
    })

    test('should return connector', () => {
      const w = new Workspace(workspaceDoc())
      w.docs.push({docType:'connector'})
      w.docs.push({docType:'workflow'})
      expect(w.connectors).toEqual([{docType:'connector'}])
    })

    test('should not override account id with {}', async () => {
      DB.allDocs.mockImplementation(() => [{_id:'a'}])
      const w = new Workspace(workspaceDoc())
      await w.updateAccounts()
      w.docs.push({docType:'connector', account:'b'})
      expect(w.connectors[0].account).toEqual('b')
      DB.allDocs.mockClear()
    })

    test('should set account', async () => {
      DB.allDocs.mockImplementation(() => [{_id:'a'}])
      const w = new Workspace(workspaceDoc())
      w.docs.push({docType:'connector', account:'a'})
      await w.updateAccounts()
      expect(w.connectors[0].account).toEqual({_id:'a'})
      DB.allDocs.mockClear()
    })
  })

  describe('updateAccounts', () => {
    test('should retrieve accounts', async () => {
      const w = new Workspace(workspaceDoc())
      w.docs.push({docType:'connector', account:'a'})
      await w.updateAccounts()
      expect(allDocs.mock.calls.length).toEqual(1)
      expect(allDocs.mock.calls[0].length).toEqual(2)
      expect(allDocs.mock.calls[0][0]).toEqual('accounts')
      expect(allDocs.mock.calls[0][1]).toEqual({keys:['a']})
    })

    test('should set []', async () => {
      const w = new Workspace(workspaceDoc())
      await w.updateAccounts()
      expect(w.accounts).toEqual([])
    })

    test('should set accounts', async () => {
      DB.allDocs.mockImplementation(() => [{a:1}])
      const w = new Workspace(workspaceDoc())
      w.docs.push({docType:'connector', account:1})
      await w.updateAccounts()
      expect(w.accounts).toEqual([{a:1}])
    })
  })

  describe('get-workspaceDbName', () => {
    test('should return DbName', () => {
      const w = new Workspace(workspaceDoc())
      expect(w.workspaceDbName).toBe('workspace1')
    })
  })

  describe('get-interactionsDbName', () => {
    test('should return DbName', () => {
      const w = new Workspace(workspaceDoc())
      expect(w.interactionsDbName).toBe('interactions1')
    })
  })

  describe('close', () => {
    test('should have close function', () => {
      const w = new Workspace(workspaceDoc())
      expect(w.close).toBeDefined()
      expect(typeof w.close).toEqual('function')
    })

    test('should emit close on workspace', () => {
      const w = new Workspace(workspaceDoc())
      w.close()
      expect(emit.mock.calls.length).toEqual(1)
      expect(emit.mock.calls[0].length).toEqual(1)
      expect(emit.mock.calls[0][0]).toEqual('close')
    })
  })
})
