const PouchDB = require('pouchdb')
const secret = require('../../secret.js')

const workspaceDB = new PouchDB(`http://${secret.dbAdmin}:${secret.dbPassword}@10.0.75.1:5984/workspace1`)
const accountsDB = new PouchDB(`http://${secret.dbAdmin}:${secret.dbPassword}@10.0.75.1:5984/accounts`)

const put = (doc) => workspaceDB.put(doc)
const remove = (doc) => workspaceDB.remove(doc)

const accounts = {
  put: (doc) => accountsDB.put(doc)
}

module.exports = {accounts, put, remove}
