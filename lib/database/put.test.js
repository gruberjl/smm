/* eslint indent: 0 */
const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-adapter-memory'))
const {put} = require('./put')

describe('db', () => {
describe('put', () => {
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

  test('should return db', async () => {
    const res = await put('')(db, {_id:'b'})
    expect(typeof res._rev).toEqual('string')
    expect(res._id).toEqual('b')
  })

  test('should close db', async () => {
    await put('')(db, {_id:'b'})
    expect(db._closed).toEqual(true)
  })

  test('should leave db open', async () => {
    await put('')(db, {_id:'b'}, {}, false)
    expect(typeof db._closed).toEqual('undefined')
  })
})
})
