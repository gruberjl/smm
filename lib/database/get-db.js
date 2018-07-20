const isBrowser = require('is-browser')
const PouchDB = isBrowser ? require('pouchdb').default : require('pouchdb')
const memoryAdapter = isBrowser ? require('pouchdb-adapter-memory').default : require('pouchdb-adapter-memory')

const setDefaults = (options) => {
  const opts = Object.assign({live:true, retry: true}, options)

  if (process.env.NODE_ENV && process.env.NODE_ENV.trim() == 'testing') opts.adapter = 'memory'

  if (opts.adapter == 'memory')
    PouchDB.plugin(memoryAdapter)
  return opts
}

const getDb = (serverPath='', dbName, options={}) => {
  const opts = setDefaults(options)
  if (typeof dbName === 'string' || dbName._closed)
    return new PouchDB(`${serverPath}${dbName}`, opts)

  return dbName
}

module.exports = {getDb}
