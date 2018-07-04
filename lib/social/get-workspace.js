const PouchDB = require('pouchdb')
const debug = require('debug')('social:get-workspace')
const secret = require('../../secret.js')

const getWorkspaceFromDb = (dbName) => {
  debug('getting workspace %s', dbName)
  const db = new PouchDB(`http://${secret.dbAdmin}:${secret.dbPassword}@10.0.75.1:5984/${dbName}`)
  const workspace = {dbName}

  return db.allDocs({include_docs:true})
    .then(res => {
      workspace.docs = res.rows.map((row) => row.doc)
    })
    .catch(e => {
      debug('Error getting data from %s', dbName)
      debug(e)
      workspace.error = {getWorkspaceFromDb: e}
    })
    .then(() => {
      db.close()
      return workspace
    })
}

const getAccounts = (workspace) => {
  debug('Getting accounts for workspace %s', workspace.dbName)

  if (workspace.error) {
    debug('Skipping getAccounts because of error for workspace %s', workspace.dbName)
  }

  const db = new PouchDB(`http://${secret.dbAdmin}:${secret.dbPassword}@10.0.75.1:5984/accounts`)
  const connectors = workspace.docs.filter(doc => doc.docType == 'connector')
  const keys = connectors.map(connector => connector.account)

  return db.allDocs({keys, include_docs:true})
    .then(res => {
      workspace.accounts = res.rows.map((row) => row.doc)
    })
    .catch(e => {
      debug('Error getting accounts for %s', workspace.dbName)
      debug(e)
      workspace.error = {getAccounts: e}
    })
    .then(() => {
      db.close()
      return workspace
    })
}

const getWorkspace = (dbName) =>
  getWorkspaceFromDb(dbName)
    .then(getAccounts)

module.exports = {getWorkspace, getWorkspaceFromDb, getAccounts}
