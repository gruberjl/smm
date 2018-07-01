const PouchDB = require('pouchdb')
const secret = require('../../secret.js')
const twitter = require('./twitter.js')

const accountsDB = new PouchDB(`http://${secret.dbAdmin}:${secret.dbPassword}@10.0.75.1:5984/accounts`)
const workspaceDB = new PouchDB(`http://${secret.dbAdmin}:${secret.dbPassword}@10.0.75.1:5984/workspace1`)

workspaceDB.allDocs({include_docs:true}).then((res) => {
  const workspace = res.rows.map((row) => row.doc)
  const connectors = workspace.filter(doc => doc.docType == 'connector')

  connectors.forEach((connector) => {
    const workflows = workspace.filter(doc => doc.docType == 'workflow' && connector._id == doc.connector)
    if (workflows.length > 0) {
      const actions = new Set(workflows.map(w => w.action))
      accountsDB.get(connector.account).then((account) => {
        const client = twitter.connect(account.token, account.tokenSecret)
        client.get('search/tweets', {q:'#office365', count:25}).then(response => {
          console.log(response)
        })
      })
    }
  })
})
