const {Sync} = require('./sync')
const PouchDB = require('./pouchdb')

describe('database:sync', () => {
  const sync = new Sync('remote', 'local')

  beforeAll((done) => {
    sync.on('initialReplicationComplete', () => {
      done()
    })
  })

  afterAll(async () => {
    sync.replication.cancel()
    await sync.localDb.destroy()
    await sync.remoteDb.destroy()
  })

  describe('constructor', () => {
    test('should set this', () => {
      expect(sync.server).toEqual('remote')
      expect(sync.dbName).toEqual('local')
      expect(sync.remoteDb).toBeInstanceOf(PouchDB)
      expect(sync.remoteDb.name).toEqual('remotelocal')
      expect(sync.localDb).toBeInstanceOf(PouchDB)
      expect(sync.localDb.name).toEqual('local')
    })
  })
})
