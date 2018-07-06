const PouchDB = require('pouchdb')

const setDefaults = (options) => {
  const opts = Object.assign({live:true, retry: true}, options)

  if (process.env.NODE_ENV.trim() == 'testing') opts.adapter = 'memory'

  if (opts.adapter == 'memory')
    PouchDB.plugin(require('pouchdb-adapter-memory'))
  return opts
}

const getDb = (serverPath='', dbName, options={}) => {
  const opts = setDefaults(options)
  if (typeof dbName === 'string')
    return new PouchDB(`${serverPath}${dbName}`, opts)

  return dbName
}

module.exports = {getDb}
