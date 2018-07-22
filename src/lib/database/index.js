const {allDocs, watchDb, bulkDocs, watchDocs} = require('../../../lib/database/index.js')
const {save} = require('./save')

const serverPath = 'http://10.0.75.1:5984/'

module.exports = {
  allDocs: allDocs(serverPath),
  watchDb: watchDb(serverPath),
  save,
  bulkDocs: bulkDocs(serverPath),
  watchDocs: watchDocs(serverPath)
}
