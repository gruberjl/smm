/* eslint indent: 0 */

const {Channel} = require('./channel-class')
const {UPDATING, SAVED} = require('./statuses')

jest.mock('../../lib/database/server')
const DB = require('../../lib/database/server')

const channelDoc = () => {
  return {
    _id: '8833f0fa-2ec1-4d5d-9475-e33bd98c0000',
    _rev: '1-2e5ef42a493d7a717a50210456741050',
    docType: 'channel',
    name: 'Office 365',
    dbName: 'channel0'
  }
}

const workspace = () => {
  return {
    _id: '00000000-2ec1-4d5d-9475-e33bd98c0000',
    db: {
      name: 'workspace1'
    }
  }
}

const C = () => new Channel(channelDoc(), workspace())

describe('Channel', () => {
  let createDb, put

  beforeEach(() => {
    createDb = DB.createDb.mockImplementation()
    put = DB.put.mockImplementation()
  })

  afterEach(() => {
    createDb.mockClear()
    put.mockClear()
  })

describe('constructor', () => {
  test('should return class', () => {
    expect(C()).toBeInstanceOf(Channel)
  })

  test('should set doc', () => {
    const c = C()
    const d = channelDoc()
    expect(c.doc).toEqual(d)
  })

  test('should set workspace', () => {
    const c = C()
    expect(c.workspace).toEqual(workspace())
  })

  test('should default status to SAVED', () => {
    expect(C().status).toEqual(SAVED)
  })

  test('should overwrite status', () => {
    const c = new Channel(channelDoc(), workspace(), UPDATING)
    expect(c.status).toEqual(UPDATING)
  })
})

describe('isBuilt', () => {
  test('should return true', () => {
    const c = C()
    c.doc.dbName = 'asdf'
    expect(c.isBuilt).toEqual(true)
  })

  test('should return false', () => {
    const c = C()
    delete c.doc.dbName
    expect(c.isBuilt).toEqual(false)
  })
})

describe('buildChannel', () => {
  test('should set status to UPDATING', async () => {
    const w = new Channel({dbName:'asdf'}, {})
    delete w.doc.dbName
    w.save = jest.fn()
    await w.buildChannel()
    expect(w.status).toEqual(UPDATING)
  })

  test('should update dbName', async () => {
    const w = new Channel({}, {})
    w.save = jest.fn()
    await w.buildChannel()
    expect(w.doc.dbName).toBeDefined()
  })

  test('should create database', async () => {
    const w = new Channel({}, {})
    w.save = jest.fn()
    createDb.mockClear()
    await w.buildChannel()
    expect(createDb.mock.calls.length).toEqual(1)
    expect(typeof createDb.mock.calls[0][0]).toEqual('string')
    expect(createDb.mock.calls[0][1]).toEqual('channel')
  })

  test('should save channel', async () => {
    const w = new Channel({dbName:'asdf'}, {})
    delete w.doc.dbName
    w.save = jest.fn()
    await w.buildChannel()
    expect(w.save.mock.calls.length).toEqual(1)
  })
})

describe('save', () => {
  test('should update status', async () => {
    const w = new Channel({dbName:'asdf'}, {db:{name:'a'}}, UPDATING)
    await w.save()
    expect(w.status).toEqual(SAVED)
  })

  test('should call put', async () => {
    const w = new Channel({dbName:'asdf'}, {db:{name:'a'}}, UPDATING)
    await w.save()
    expect(put.mock.calls.length).toEqual(1)
    expect(put.mock.calls[0][0]).toEqual('a')
    expect(put.mock.calls[0][1]).toEqual({dbName:'asdf'})
  })
})

})
