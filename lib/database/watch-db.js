const EventEmitter = require('events')
const PouchDB = require('pouchdb')
const secret = require('../../secret.js')
const {allDocs} = require('./all-docs')

const setDefaults = (options) => {
  const defaults = {live:true, retry: true}

  if (typeof options === 'object')
    return Object.assign(defaults, options)

  return defaults
}

const watchDb = (dbName, OPTIONS) => {
  const options = setDefaults(OPTIONS)
  const localDb = new PouchDB(dbName)
  const REMOTE_DB = `http://${secret.dbAdmin}:${secret.dbPassword}@10.0.75.1:5984/${dbName}`
  const emitter = new EventEmitter()

  emitter.on('close', () => {
    localDb.close()
  })

  const emitChange = () => {
    allDocs(localDb, {}, false).then(docs => {
      emitter.emit('change', docs)
    })
  }

  PouchDB.replicate(REMOTE_DB, localDb).on('complete', () => {
    emitChange()
    const rep = PouchDB.replicate(REMOTE_DB, localDb, options)
    rep.on('change', emitChange)
    emitter.on('close', () => {rep.cancel()})
  })

  return emitter
}

module.exports = {watchDb}
