const db = require('../database/server')
const {getAccounts} = require('./get-accounts')
const {createCache} = require('./create-cache')
const {runCycle} = require('./run-cycle')
const workspaces = []

const push = (workspace) => {
  const idx = workspaces.findIndex(w => w.workspaceDoc._id == workspace.workspaceDoc._id)
  if (idx >= 0) workspaces.splice(idx, 1)
  runCycle(workspace)
  workspaces.push(workspace)
}

const add = (workspaceDoc) => {
  db.watchDb(workspaceDoc.dbName).on('change', async (workspace) => {
    if (!workspace.error) {
      const accounts = await getAccounts(workspace)
      if (!accounts.error) {
        const cache = createCache(workspace, accounts)
        push({workspaceDoc, workspace, accounts, cache})
      }
    }
  })
}

const get = () => workspaces

module.exports = {add, get, push}
