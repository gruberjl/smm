const EventEmitter = require('events')
const {getDb} = require('./get-db')
const {allDocs} = require('./all-docs')
const debug = require('debug')('database:watch-docs')

const watchDocs = serverPath => (dbName) => {
  const db = getDb(serverPath, dbName)
  const emitter = new EventEmitter()

  const emitDiff = (docs) => {
    emitter.emit('diff', docs)
  }

  allDocs(serverPath)(db, {}, false).then(docs => {
    if (docs.error) {
      debug('Error in all docs:\n%O',docs.error)
      return
    }

    emitDiff(docs)
  })

  const changes = db.changes({since: 'now', live: true, include_docs: true})
  changes.on('change', (change) => {
    emitDiff([change.doc])
  })
  changes.on('error', (err) => {
    debug('Error in changes:\n%O',err)
  })

  emitter.on('close', () => {
    if (changes) changes.cancel()
    if (!db._closed) db.close()
  })

  return emitter
}

module.exports = {watchDocs}
