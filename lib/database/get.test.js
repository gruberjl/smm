/* eslint indent: 0 */
const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-adapter-memory'))
const {get} = require('./get')

describe('db', () => {
describe('get', () => {
  let db, count = 0

  beforeEach(async () => {
    db = new PouchDB(`test${count}`, {adapter: 'memory'})
    count++
    await db.put({_id:'a', b:1})
  })

  afterEach(async () => {
    if (!db._closed)
      db.destroy()
  })

  test('should return doc', async () => {
    const doc = await get()(db, 'a')
    expect(doc.error).toBeUndefined()
    expect(doc._id).toEqual('a')
    expect(doc.b).toEqual(1)
  })
})
})
