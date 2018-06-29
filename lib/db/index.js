const PouchDB = require('pouchdb')

const workspaceDB = new PouchDB('http://10.0.75.1:5984/workspace1')

const put = (doc) => workspaceDB.put(doc)
const remove = (doc) => workspaceDB.remove(doc)

module.exports = {put, remove}
