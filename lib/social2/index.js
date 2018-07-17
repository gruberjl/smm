const db = require('../database/server')

const start = async () => {
  const workspaceDocs = await db.allDocs('workspaces')
  workspaceDocs.forEach((workspaceDoc) => {
    const watch = db.watchDb(workspaceDoc.dbName)
    watch.on('change', workspace => {
      console.log('change')
      console.log(workspace)
      console.log('')
    })
    watch.on('diff', workspace => {
      console.log('diff')
      console.log(workspace)
      console.log('')
    })
  })
}

start()
