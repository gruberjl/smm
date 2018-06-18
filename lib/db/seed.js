const fs = require('fs')
const {join} = require('path')
const secret = require('../../secret.js')
const data = join(__dirname, 'data')

const WORKSPACE = {
  connectors: {
    twitterGruberjl: {
      platform: 'twitter',
      token: secret.twitterAccessToken,
      secret: secret.twitterTokenSecret
    }
  },
  channels: {
    office365: { }
  },
  workflows: {
    connector: 'twitterGruberjl',
    channel: 'office365',
    hashtags: ['office365']
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
