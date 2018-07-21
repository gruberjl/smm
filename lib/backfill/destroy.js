const {allDocs, bulkDocs} = require('../database/server')

const destroy = async (channelDb, workflowId) => {
  const messages = await allDocs(channelDb, {}, false)
  const msgsToDelete = messages
    .filter(doc => doc.workflow._id == workflowId)
    .map(doc => {
      doc._deleted = true
      return doc
    })

  const results = await bulkDocs(channelDb, msgsToDelete)
  return results
}

module.exports = {destroy}
