const fs = require('fs')
const {join} = require('path')
const secret = require('../../secret.js')
const data = join(__dirname, 'data')

const WORKSPACE = {
  id: 'WORKSPACE',
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

const createWorkspace = () => {
  const path = join(data, 'workspace.json')
  if (fs.existsSync(path))
    fs.unlinkSync(path)
  fs.writeFileSync(path, JSON.stringify(WORKSPACE, null, '\t'), 'utf8')
}

const start = () => {
  createWorkspace()
}

start()
