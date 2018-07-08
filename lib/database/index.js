const {allDocs} = require('./all-docs')
const {watchDb} = require('./watch-db')
const {bulkDocs} = require('./bulk-docs')
const {put} = require('./put')

module.exports = {allDocs, watchDb, put, bulkDocs}
