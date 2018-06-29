const secret = require('../../secret.js')

const db = async (redis) => {
  await redis.set('next_id', 0)
}

const flushDb = async (redis) => {
  await redis.flushdb()
}

const workspace = {
  id: '11111111-1111-1111-1111-111111111111',
  connectors: {
    '22222222-2222-2222-2222-222222222222': {
      id: '22222222-2222-2222-2222-222222222222',
      name: 'twitter @gruberjl',
      account: '55555555-5555-5555-5555-555555555555',
      provider: 'twitter',
      accountName: 'gruberjl',
      image: 'https://pbs.twimg.com/profile_images/828784665083465728/4ungbkuP_normal.jpg'
    }
  },
  channels: {
    '33333333-3333-3333-3333-333333333333': {
      id: '33333333-3333-3333-3333-333333333333',
      name:'office365'
    }
  },
  workflows: {
    '44444444-4444-4444-4444-444444444444': {
      id: '44444444-4444-4444-4444-444444444444',
      name: 'Twitter @Gruberjl to Office365',
      connector: '22222222-2222-2222-2222-222222222222',
      channel: '33333333-3333-3333-3333-333333333333',
      action: 'tweet',
      filters: {
        language: 'en',
        search: '#office365',
        quality: 'low'
      }
    }
  }
}

const account = {
  id: '55555555-5555-5555-5555-555555555555',
  token: secret.twitterAccessToken,
  tokenSecret: secret.twitterTokenSecret
}

module.exports = {workspace, db, flushDb, account}
