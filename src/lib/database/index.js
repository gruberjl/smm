const {allDocs, watchDb, put, bulkDocs} = require('../../../lib/database/index.js')

const serverPath = 'http://10.0.75.1:5984/'

module.exports = {
  allDocs: allDocs(serverPath),
  watchDb: watchDb(serverPath),
  put: put(serverPath),
  bulkDocs: bulkDocs(serverPath)
}
