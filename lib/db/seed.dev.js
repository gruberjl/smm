const PouchDB = require('pouchdb')
const uuid = require('uuid/v4')
const secret = require('../../secret.js')
const {createChanelDb} = require('./index.js')

const workspace = {
  _id: uuid(),
  dbName: 'workspace1',
  interactionsDbName: 'interactions1'
}

const account = {
  _id: uuid(),
  token: secret.twitterAccessToken,
  tokenSecret: secret.twitterTokenSecret,
  provider: 'twitter'
}

const channel = {
  _id: uuid(),
  docType: 'channel',
  name: 'Office 365',
  dbName: 'channel0'
}

const connector = {
  _id: uuid(),
  docType: 'connector',
  name: 'Twitter @gruberjl',
  account: account._id,
  provider: 'twitter',
  accountName: 'gruberjl',
  image: 'https://pbs.twimg.com/profile_images/828784665083465728/4ungbkuP_normal.jpg'
}

const workflow = {
  _id: uuid(),
  docType: 'workflow',
  name: 'Twitter @Gruberjl to Office365',
  connector: connector._id,
  channel: channel._id,
  action: 'search',
  filters: {
    language: 'en',
    search: '#office365 #microsoft',
    resultType: 'recent',
    fromPopularity: 1000,
    includeShares: false
  }
}

const start = async () => {
  const workspacesDB = new PouchDB(`http://${secret.dbAdmin}:${secret.dbPassword}@10.0.75.1:5984/workspaces`)
  const interactionsDB = new PouchDB(`http://${secret.dbAdmin}:${secret.dbPassword}@10.0.75.1:5984/${workspace.interactionsDbName}`)
  const workspaceDB = new PouchDB(`http://${secret.dbAdmin}:${secret.dbPassword}@10.0.75.1:5984/${workspace.dbName}`)
  const accountsDB = new PouchDB(`http://${secret.dbAdmin}:${secret.dbPassword}@10.0.75.1:5984/accounts`)

  try {
    await workspacesDB.put(workspace)
    await interactionsDB.info()
    await accountsDB.put(account)
    await workspaceDB.put(channel)
    await createChanelDb(channel.dbName)
    await workspaceDB.put(connector)
    await workspaceDB.put(workflow)
  } catch (e) {
    console.error(e)
  } finally {
    workspacesDB.close()
    workspaceDB.close()
    accountsDB.close()
  }
}

start()
