const db = require('../database/server')
const workspaces = require('./workspaces')

const loop = () => {
  setInterval(() => {
    workspaces.getData().then(data => {
      console.log(data.length)
    })
  }, 30000)
}

const start = async () => {
  const workspaceDocs = await db.allDocs('workspaces')
  workspaceDocs.forEach((workspaceDoc) => {
    const watch = db.watchDb(workspaceDoc.dbName)
    watch.on('diff', async workspace => {
      const newConnections = workspaces.filterNewConnectors(workspaceDoc, workspace)
      const keys = newConnections.map(c => c.account._id)
      const accounts = await db.allDocs('accounts', {keys})

      workspaces.add(workspaceDoc, workspace, accounts)
    })
  })
}

start()
loop()
