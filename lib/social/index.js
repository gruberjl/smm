const workspaces = require('./workspaces')
const {runCycle} = require('./run-cycle')
const db = require('../database/server')

const startGetDataLoop = () => {
  setInterval(() => {
    workspaces.get().forEach(workspace => {
      runCycle(workspace)
    })
  }, 15000)
}

const start = async () => {
  const workspaceDocs = await db.allDocs('workspaces')
  workspaceDocs.forEach((workspaceDoc) =>
    workspaces.add(workspaceDoc)
  )
}

start()
startGetDataLoop()
