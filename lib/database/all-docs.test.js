/* eslint indent: 0 */
const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-adapter-memory'))
const {allDocs} = require('./all-docs')

describe('db', () => {
describe('all-docs', () => {
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
    const res = await allDocs('')(db)
    expect(res.length).toEqual(1)
    expect(res[0]._id).toEqual('a')
  })

  test('should close db', async () => {
    await allDocs('')(db)
    expect(db._closed).toEqual(true)
  })

  test('should leave db open', async () => {
    await allDocs('')(db, {}, false)
    expect(typeof db._closed).toEqual('undefined')
  })
})
})
