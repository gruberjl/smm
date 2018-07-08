const {allDocs, watchDb, put, bulkDocs} = require('./index.js')
const secret = require('../../secret.js')

const serverPath = `http://${secret.dbAdmin}:${secret.dbPassword}@10.0.75.1:5984/`

module.exports = {
  allDocs: allDocs(serverPath),
  watchDb: watchDb(serverPath),
  put: put(serverPath),
  bulkDocs: bulkDocs(serverPath)
}
