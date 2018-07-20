const {bulkDocs} = require('../database/server')

const writeData = (workspace, messages) => {
  const msgMap = {}
  messages.forEach(msg => {
    const dbName = workspace.dbMap[msg.workflow._id]
    if (!msgMap[dbName]) msgMap[dbName] = []
    msgMap[dbName].push(msg)
  })

  const promises = Object.keys(msgMap).map(dbName =>
    bulkDocs(dbName, msgMap[dbName])
  )

  return Promise.all(promises)
}

module.exports = {writeData}
