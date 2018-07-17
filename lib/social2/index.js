const db = require('../database/server')
const workspaces = require('./workspaces')

const start = async () => {
  const workspaceDocs = await db.allDocs('workspaces')
  workspaceDocs.forEach((workspaceDoc) => {
    const watch = db.watchDb(workspaceDoc.dbName)
    watch.on('diff', workspace => {
      workspaces.add(workspaceDoc, workspace)
    })
  })
}

start()
