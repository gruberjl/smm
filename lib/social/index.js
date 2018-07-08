const {getData} = require('./get-data.js')
const {writeData} = require('./write-data.js')
const workspaces = require('./workspaces')
const db = require('../database/server')

const startGetDataLoop = () => {
  setInterval(() => {
    workspaces.get().forEach(workspace => {
      getData(workspace)
        .then(messages => {
          writeData(workspace, messages)
        })
    })
  }, 15000)
}

const start = async () => {
  const workspaceDocs = await db.allDocs('workspaces')
  console.log(workspaceDocs)
  workspaceDocs.forEach((workspaceDoc) =>
    workspaces.add(workspaceDoc)
  )
}

start()
startGetDataLoop()
