const secret = require('../../secret.js')

const db = async (redis) => {
  await redis.set('next_id', 0)
}

const flushDb = async (redis) => {
  await redis.flushdb()
}

const workspace = {
  id: '1',
  connectors: {
    twitterGruberjl: {
      id: 'twitterGruberjl',
      name: 'twitter @gruberjl',
      account: 'ab4a36b3-935f-4d07-9839-912b1a4dfd96',
      provider: 'twitter',
      accountName: 'gruberjl',
      image: 'https://pbs.twimg.com/profile_images/828784665083465728/4ungbkuP_normal.jpg'
    }
  },
  channels: {
    office365: {
      id: 'office365',
      name:'office365'
    }
  },
  workflows: {
    twitterO365: {
      id: 'twitterO365',
      connector: 'twitterGruberjl',
      channel: 'office365',
      action: 'tweet',
      filters: {
        hashtags: ['office365']
      }
    }
  }
}

const account = {
  id: 'ab4a36b3-935f-4d07-9839-912b1a4dfd96',
  token: secret.twitterAccessToken,
  tokenSecret: secret.twitterTokenSecret
}

module.exports = {workspace, db, flushDb, account}
