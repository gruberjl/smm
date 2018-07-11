const {allDocs, watchDb, put, get, bulkDocs, watchDocs} = require('./index.js')
const {createDb} = require('./create-db.js')
const secret = require('../../secret.js')

const serverPath = `http://${secret.dbAdmin}:${secret.dbPassword}@10.0.75.1:5984/`

module.exports = {
  allDocs: allDocs(serverPath),
  watchDb: watchDb(serverPath),
  put: put(serverPath),
  get: get(serverPath),
  bulkDocs: bulkDocs(serverPath),
  createDb: createDb(serverPath),
  watchDocs: watchDocs(serverPath)
}
