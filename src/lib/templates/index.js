const uuid = require('uuid/v4')

const channel = () => ({
  _id: uuid(),
  docType: 'channel',
  name: ''
})

const connector = () => ({
  _id: uuid(),
  docType: 'connector',
  name: '',
  account: '',
  provider: '',
  accountName: '',
  image: ''
})

const workflow = () => ({
  _id: uuid(),
  docType: 'workflow',
  name: '',
  connector: '',
  channel: '',
  action: '',
  filters: {
    language: 'en',
    search: '',
    quality: 'low'
  }
})

module.exports = {channel, connector, workflow}
