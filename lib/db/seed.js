const PouchDB = require('pouchdb')
const uuid = require('uuid/v4')
const secret = require('../../secret.js')

const workspaceDB = new PouchDB(`http://${secret.dbAdmin}:${secret.dbPassword}@10.0.75.1:5984/workspace1`)
const accountsDB = new PouchDB(`http://${secret.dbAdmin}:${secret.dbPassword}@10.0.75.1:5984/accounts`)

const account = {
  _id: uuid(),
  token: secret.twitterAccessToken,
  tokenSecret: secret.twitterTokenSecret,
  provider: 'twitter'
}

const channel = {
  _id: uuid(),
  docType: 'channel',
  name: 'Office 365'
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
  action: 'tweet',
  filters: {
    language: 'en',
    search: '#office365',
    quality: 'low'
  }
}

const start = async () => {
  try {
    await accountsDB.put(account)
    await workspaceDB.put(channel)
    await workspaceDB.put(connector)
    await workspaceDB.put(workflow)
  } catch (e) {
    console.error(e)
  }
}

start()
