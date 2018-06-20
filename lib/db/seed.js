const secret = require('../../secret.js')
const uuid = require('uuid/v4')

const workspace = {
  _id: uuid(),
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

module.exports = {workspace}
