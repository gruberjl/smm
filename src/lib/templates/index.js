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

module.exports = {channel, connector}
