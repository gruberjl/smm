const isBrowser = require('is-browser')
const PouchDB = isBrowser ? require('pouchdb').default : require('pouchdb')

const createDb = (serverPath='') => (dbName, dbType, autoClose=true) => new Promise(res => {
  if (dbType != 'channel') throw 'attempting to create a db with an unknown type'

  const db = new PouchDB(`${serverPath}${dbName}`)
  db.info((err, info) => {
    if (autoClose) db.close()
    if (err) return res({error: {raw:err}})
    return res(info)
  })
})

module.exports = {createDb}
