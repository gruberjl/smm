const EventEmitter = require('events')
const isBrowser = require('is-browser')
const PouchDB = isBrowser ? require('pouchdb').default : require('pouchdb')
const {getDb} = require('./get-db')
const {allDocs} = require('./all-docs')

const setRepDefaults = (options) => Object.assign({live:true, retry: true}, options)

const setLocalDbDefaults = (options) => Object.assign({adapter: 'memory'}, options)

const watchDb = serverPath => (remoteDbName, REP_OPTIONS={}, REMOTE_DB_OPTIONS={}, LOCAL_DB_OPTIONS={}, LOCAL_DB_NAME='') => {
  const repOptions = setRepDefaults(REP_OPTIONS)
  const remoteDb = getDb(serverPath, remoteDbName, REMOTE_DB_OPTIONS)
  const localDbName = LOCAL_DB_NAME == '' ? remoteDb.name : LOCAL_DB_NAME
  const localDb = getDb('', localDbName, setLocalDbDefaults(LOCAL_DB_OPTIONS))
  const emitter = new EventEmitter()
  emitter.remoteDb = remoteDb
  emitter.localDb = localDb
  let rep

  emitter.on('close', () => {
    if (rep) rep.cancel()
    if (!remoteDb._closed) remoteDb.close()
  })

  const emitChange = (response) => {
    if (response && response.docs)
      emitter.emit('diff', response.docs)

    allDocs()(localDb, {}, false).then(docs => {
      emitter.emit('change', docs)
      if (!response || !response.docs)
        emitter.emit('diff', docs)
    })
  }

  PouchDB.replicate(remoteDb, localDb).on('complete', () => {
    emitChange()
    rep = PouchDB.replicate(remoteDb, localDb, repOptions)
    emitter.replication = rep
    rep.on('change', emitChange)
    rep.on('err', (err) => console.log(err))
  })

  return emitter
}

module.exports = {watchDb}
