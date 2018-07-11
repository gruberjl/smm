/* eslint indent: 0 */
const EventEmitter = require('events')
const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-adapter-memory'))
const {watchDocs} = require('./watch-docs')

describe('db', () => {
describe('watch-docs', () => {
  let db, count = 0, feed

  beforeEach(async () => {
    db = new PouchDB(`test${count}`, {adapter: 'memory'})
    count++
    await db.put({_id:'a', b:1})
  })

  afterEach(() => {
    if (!db._closed) db.destroy()
    if (feed) feed.emit('close')
  })

  test('should return event emitter', () => {
    feed = watchDocs('')(db)
    expect(feed instanceof EventEmitter).toEqual(true)
    expect(typeof feed._events.close).toEqual('function')
  })

  test('should emit all docs', (done) => {
    feed = watchDocs('')(db)
    feed.on('change', docs => {
      expect(Array.isArray(docs)).toEqual(true)
      expect(docs.length).toEqual(1)
      expect(docs[0]._id).toEqual('a')
      expect(docs[0].b).toEqual(1)
      done()
    })
  })

  test('should emit changes', (done) => {
    let callCount = 0
    feed = watchDocs('')(db)
    feed.on('change', docs => {
      callCount++
      if (callCount==2) {
        expect(Array.isArray(docs)).toEqual(true)
        expect(docs.length).toEqual(1)
        expect(docs[0]._id).toEqual('b')
        expect(docs[0].b).toEqual(2)
        done()
      }
    })

    db.put({_id:'b', b:2})
  })
})
})
