const db = require('../database')
const {getAccounts} = require('./get-accounts')
const {createCache} = require('./create-cache')
const workspaces = []

const push = (workspace) => {
  console.log(workspace.cache)
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

module.exports = {add, get}
