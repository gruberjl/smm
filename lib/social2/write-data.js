const {bulkDocs} = require('../database/server')

const writeData = (workspaceDocs, messages) => {
  const dbMap = {}
  const workflows = workspaceDocs.filter(doc => doc.docType == 'workflow')
  workflows.forEach(workflow => {
    const channel = workspaceDocs.find(doc => doc._id == workflow.channel)
    dbMap[workflow._id] = channel.dbName
  })

  const msgMap = {}
  messages.forEach(msg => {
    const dbName = dbMap[msg.workflow._id]
    if (!msgMap[dbName]) msgMap[dbName] = []
    msgMap[dbName].push(msg)
  })

  const promises = Object.keys(msgMap).map(dbName =>
    bulkDocs(dbName, msgMap[dbName])
  )

  return Promise.all(promises)
}

module.exports = {writeData}
