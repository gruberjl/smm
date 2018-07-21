const {get, allDocs} = require('../database/server')
const {destroy} = require('./destroy')
const {create} = require('./create')

const replaceMessages = async (workspaceDb, workflow) => {
  const workspaceDocs = await allDocs(workspaceDb, {}, false)
  const connector = workspaceDocs.find(d => d._id == workflow.connector)
  const account = await get('accounts', connector.account._id)
  const channel = workspaceDocs.find(d => d._id == workflow.channel)
  await destroy(channel.dbName, workflow._id)
  await create(workflow, account.token, account.tokenSecret, channel.dbName)
}

module.exports = {replaceMessages}
