const {allDocs, watchDb, put, get, bulkDocs, watchDocs} = require('../index.js')
const {createDb} = require('../create-db.js')

const serverPath = ''

module.exports = {
  allDocs: allDocs(serverPath),
  watchDb: watchDb(serverPath),
  put: put(serverPath),
  get: get(serverPath),
  bulkDocs: bulkDocs(serverPath),
  createDb: createDb(serverPath),
  watchDocs: watchDocs(serverPath)
}
