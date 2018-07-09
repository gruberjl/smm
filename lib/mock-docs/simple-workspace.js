const accounts = [
  {
    _id: '51fb0510-9c84-40fd-0000-000000000000',
    token: '000000000-0000000000',
    tokenSecret: '00000000000',
    provider: 'twitter'
  }
]

const channels = [
  {
    _id: '51fb0510-9c84-40fd-0001-000000000000',
    docType: 'channel',
    name: 'Simple Channel0',
    dbName: 'channel-51fb0510-9c84-40fd-0002-000000000000'
  }
]

const connectors = [
  {
    _id: '51fb0510-9c84-40fd-0003-000000000000',
    docType: 'connector',
    name: 'Twitter @gruberjl',
    account: accounts[0]._id,
    provider: 'twitter',
    accountName: 'gruberjl',
    image: 'https://pbs.twimg.com/profile_images/828784665083465728/4ungbkuP_normal.jpg'
  }
]

const workflows = [
  {
    _id: '51fb0510-9c84-40fd-0004-000000000000',
    docType: 'workflow',
    name: 'Twitter @Gruberjl to Office365',
    connector: connectors[0]._id,
    channel: channels[0]._id,
    action: 'search',
    filters: {
      language: 'en',
      search: '#office365 #microsoft',
      resultType: 'recent',
      fromPopularity: 1000,
      includeShares: false
    }
  }
]

const workspace = [].concat(channels, connectors, workflows)

module.exports = {accounts, channels, connectors, workflows, workspace}
