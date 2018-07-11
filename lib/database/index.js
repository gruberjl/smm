const {allDocs} = require('./all-docs')
const {watchDb} = require('./watch-db')
const {bulkDocs} = require('./bulk-docs')
const {put} = require('./put')
const {get} = require('./get')
const {watchDocs} = require('./watch-docs')

module.exports = {allDocs, watchDb, put, get, bulkDocs, watchDocs}
