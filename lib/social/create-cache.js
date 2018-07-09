const twitter = require('./twitter')

const validateWorkflow = (workspace, workflow) => {
  const channel = workspace.find(doc => doc._id == workflow.channel)
  return Boolean(channel.dbName)
}

const createCache = (workspace, accounts) => {
  const cache =  {connectors: []}
  const connectors = workspace.filter(doc => doc.docType == 'connector')

  connectors.forEach(connector => {
    const workflows = workspace.filter(doc => (
      doc.docType == 'workflow' &&
      connector._id == doc.connector &&
      validateWorkflow(workspace, doc)
    ))

    if (workflows.length == 0) return

    const account = accounts.find(doc => doc._id == connector.account)

    const connectorCache = {
      _id: connector._id,
      provider: connector.provider,
      name: connector.name
    }

    if (connector.provider == 'twitter') {
      const twitterCache = twitter.createCache(connector, workflows, account)
      Object.assign(connectorCache, twitterCache)
    }

    cache.connectors.push(connectorCache)
  })

  return cache
}

module.exports = {createCache}
