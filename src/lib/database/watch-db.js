const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-adapter-memory'))
const {allDocs} = require('./all-docs')
const {store} = require('../store')

const setDefaults = (options) => {
  const defaults = {live:true, retry: true}

  if (typeof options === 'object')
    return Object.assign(defaults, options)

  return defaults
}

const watchDb = (dbName, actionType, OPTIONS) => {
  const options = setDefaults(OPTIONS)
  const localDb = new PouchDB(dbName, {adapter: 'memory'})
  const REMOTE_DB = `http://10.0.75.1:5984/${dbName}`

  const emitChange = () => {
    allDocs(localDb, {}, false).then(docs => {
      const action = Object.assign({type:actionType}, {docs})
      store.dispatch(action)
    })
  }

  PouchDB.replicate(REMOTE_DB, localDb).on('complete', () => {
    emitChange()
    const rep = PouchDB.replicate(REMOTE_DB, localDb, options)
    rep.on('change', emitChange)
  })
}

module.exports = {watchDb}
