/* eslint indent: 0 */
const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-adapter-memory'))
const {getDb} = require('./get-db')

describe('db', () => {
describe('get-db', () => {
  test('should return db', () => {
    const db = new PouchDB('test1', {adapter: 'memory'})
    const res = getDb('', db)
    expect(res instanceof PouchDB).toEqual(true)
  })

  test('should return db', () => {
    const res = getDb('', 'test2')
    expect(res instanceof PouchDB).toEqual(true)
  })

  test('should reopen db', async () => {
    const res = getDb('', 'test3')
    await res.close()
    expect(res._closed).toEqual(true)
    const res2 = getDb('', res)
    expect(res2._closed).toBeUndefined()
  })
})
})
