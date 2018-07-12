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

  test('should always emit diff', (done) => {
    rep = watchDb('remote-')(`local${count}`, {}, {adapter: 'memory'})
    rep.on('diff', docs => {
      expect(docs).toEqual([])
      done()
    })
  })

  test('should send all docs', (done) => {
    rep = watchDb()('db01', {}, {adapter: 'memory'}, {}, 'db02')
    let c = 0
    rep.on('change', (docs) => {
      c++
      if (c==1) rep.remoteDb.put({_id:'b'})
      if (c==2) rep.remoteDb.put({_id:'c'})
      if (c==3) {
        expect(docs.length).toEqual(2)
        done()
      }
    })
  })

  test('should emit diff on remote change', (done) => {
    rep = watchDb()('db03', {}, {adapter: 'memory'}, {}, 'db04')
    let c = 0
    rep.on('diff', (docs) => {
      c++
      if(c==1) rep.remoteDb.put({_id:'b'})
      if(c==2) rep.remoteDb.put({_id:'c'})
      if(c==3) {
        expect(docs.length).toEqual(1)
        done()
      }
    })
  })
})
})
