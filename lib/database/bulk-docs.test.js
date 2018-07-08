/* eslint indent: 0 */
const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-adapter-memory'))
const {bulkDocs} = require('./bulk-docs')

describe('db', () => {
describe('bulk-docs', () => {
  let db, count = 0

  beforeEach(async () => {
    db = new PouchDB(`test${count}`, {adapter: 'memory'})
    count++
    await db.put({_id:'a'})
  })

  afterEach(async () => {
    if (!db._closed)
      db.destroy()
  })

  test('should create doc', async () => {
    const res = await bulkDocs()(db, [{_id:'b'}])
    expect(res.response[0].ok).toEqual(true)
    expect(res.saved.length).toEqual(1)
    expect(res.saved[0]._id).toEqual('b')
    expect(res.saved[0]._rev).toBeDefined()
  })

  test('should conflict', async () => {
    const res = await bulkDocs()(db, [{_id:'a'}])
    expect(res.response[0].error).toEqual(true)
    expect(res.response[0].status).toEqual(409)
    expect(res.saved.length).toEqual(0)
  })

  test('should handle multiple docs', async () => {
    const res = await bulkDocs()(db, [{_id:'a', a:1}, {_id:'b', a:1}])
    expect(res.response[0].error).toEqual(true)
    expect(res.response[1].ok).toEqual(true)
    expect(res.saved.length).toEqual(1)
  })
})
})
