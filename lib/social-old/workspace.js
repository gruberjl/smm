const PouchDB = require('pouchdb')
const {setProviders} = require('./providers')
const secret = require('../../secret.js')
const accountsDB = new PouchDB(`http://${secret.dbAdmin}:${secret.dbPassword}@10.0.75.1:5984/accounts`)

const setupWorkspace = (dbName) =>
  setWorkspace(dbName)
    .then(setConnectors)
    .then(setAccounts)
    .then(setWorkflows)
    .then(setProviders)

const setWorkspace = (dbName) => {
  const workspaceDB = new PouchDB(`http://${secret.dbAdmin}:${secret.dbPassword}@10.0.75.1:5984/${dbName}`)

  return workspaceDB.allDocs({include_docs:true})
    .then(res => {
      workspaceDB.close()
      return { dbName, docs: res.rows.map((row) => row.doc) }
    })
}

const setConnectors = (workspace) => {
  const connectorIds = workspace.docs
    .filter(doc => doc.docType == 'workflow')
    .map(workflow => workflow.connector)

  workspace.connectors = workspace.docs
    .filter(doc => doc.docType == 'connector' && connectorIds.includes(doc._id))
    .map(doc => ({doc}))

  return workspace
}

const setAccounts = (workspace) => {
  const promises = []

  workspace.connectors.forEach(connector => {
    promises.push(accountsDB.get(connector.doc.account)
      .then(account => {
        connector.account = account
      }))
  })

  return Promise.all(promises).then(() => {accountsDB.close()}).then(() => workspace)
}

const setWorkflows = (workspace) => {
  workspace.connectors.forEach(connector => {
    connector.actions = {}

    workspace.docs
      .filter(doc => doc.docType == 'workflow' && doc.connector == connector.doc._id)
      .forEach(workflow => {
        if (!connector.actions[workflow.action])
          connector.actions[workflow.action] = {workflows:[]}
        connector.actions[workflow.action].workflows.push({doc:workflow, nextRun: 0})
      })
  })

  return workspace
}

module.exports = {setupWorkspace, setWorkspace, setConnectors, setAccounts, setWorkflows}
