const secret = require('../../secret.js')

const db = async (redis) => {
  await redis.set('next_id', 0)
}

const flushDb = async (redis) => {
  await redis.flushdb()
}

const workspace = {
  id: 1,
  connectors: {
    twitterGruberjl: {
      id: 'twitterGruberjl',
      platform: 'twitter',
      token: secret.twitterAccessToken,
      secret: secret.twitterTokenSecret
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

module.exports = {workspace, db, flushDb}
