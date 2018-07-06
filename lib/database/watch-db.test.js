/* eslint indent: 0 */
const EventEmitter = require('events')
const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-adapter-memory'))
const {watchDb} = require('./watch-db')

describe('db', () => {
describe('watch-db', () => {
  let rep, count = 0

  beforeEach(async () => {
    count++
  })

  afterEach(() => {
    if (rep)
      rep.emit('close')
  })

  test('should setup replication', async () => {
    rep = watchDb('remote-')(`local${count}`, {}, {adapter: 'memory'})
    expect(rep instanceof EventEmitter).toEqual(true)
    expect(typeof rep._events.close).toEqual('function')
  })

  test('should always emit change', (done) => {
    rep = watchDb('remote-')(`local${count}`, {}, {adapter: 'memory'})
    rep.on('change', docs => {
      expect(docs).toEqual([])
      done()
    })
  })

  test('should sync remote change', (done) => {
    rep = watchDb()('db01', {}, {adapter: 'memory'}, {}, 'db02')
    let counter = 0
    rep.on('change', (docs) => {
      if (counter == 0) rep.remoteDb.put({_id:'b'})
      counter++
      if (counter == 2) {
        expect(docs.length).toEqual(1)
        done()
      }
    })
  })
})
})
