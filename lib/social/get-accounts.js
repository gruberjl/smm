const db = require('../database/server')

const getAccounts = async (workspace) => {
  const connectors = workspace.filter(doc => doc.docType == 'connector')
  const keys = connectors.map(connector => connector.account)
  const accounts = await db.allDocs('accounts', {keys})
  return accounts
}

module.exports = {getAccounts}
