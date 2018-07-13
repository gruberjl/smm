const uuid = require('uuid/v4')
const {watchDb, allDocs, createDb, put} = require('../../lib/database/server')
const {TwitterInteraction} = require('./twitter-interaction-class')

class Workspace {
  constructor(workspaceDoc) {
    this.workspaceDoc = workspaceDoc
    this.workspaceEmitter = watchDb(workspaceDoc.dbName)
    this.workspaceEmitter.on('change', this.setWorkspaceDocs)
    this.interactionsEmitter = watchDb(this.interactionsDbName)
    this.interactionsEmitter.on('change', this.setInteractions)
    this.docs = []
    this.accounts = []
    this.interactions = []
    this.submittedInteractions = []
  }

  setWorkspaceDocs(docs) {
    this.docs = docs
  }

  get workspaceDbName() {
    return this.workspaceDoc.dbName
  }

  get interactionsDbName() {
    return this.workspaceDoc.interactionsDbName
  }

  getConnectorDoc(interactionDoc) {
    return this.connectors.find(c => c._id == interactionDoc.connector._id)
  }

  getAccountDoc(connectorDoc) {
    return this.accounts.find(c => c._id == connectorDoc.account)
  }

  setInteractions(docs) {
    this.interactions = docs.map(d => {
      return new TwitterInteraction(d)
    })
    this.publishInteractions()
  }

  publishInteractions() {
    const interactions = this.interactions.filter(doc => !doc.published && !this.submittedInteractions.includes(doc._id))
    interactions.forEach(i => this.submittedInteractions.push(i._id))
  }

  async buildChannels() {
    const channels = this.channels.filter(c => !c.dbName)
    for (let i = 0; i < channels.length; i++) {
      const dbName = `channel-${uuid()}`
      await createDb(dbName, 'channel')
      channels[i].dbName = dbName
      await put(this.workspaceDbName, channels[i])
    }
  }

  get channels() {
    return this.docs.filter(doc => doc.docType == 'channel')
  }

  get connectors() {
    const connectors = this.docs.filter(doc => doc.docType == 'connector')
    connectors.forEach(connector => {
      const account = this.accounts.find(a => a._id == connector.account)
      if (account) connector.account = account
    })
    return connectors
  }

  async updateAccounts() {
    const keys = this.connectors.map(connector => connector.account)
    this.accounts = keys.length>0 ? await allDocs('accounts', {keys}) : []
  }

  close() {
    if (this.workspaceEmitter) {
      this.workspaceEmitter.emit('close')
    }
  }
}

module.exports = {Workspace}
