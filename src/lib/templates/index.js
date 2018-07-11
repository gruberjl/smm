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
  action: 'search',
  filters: {
    language: 'en',
    search: '',
    resultType: 'recent',
    fromPopularity: 0,
    includeShares: false
  }
})

const interactions = () => ({
  _id: uuid(),
  provider: '',
  providerId: '',
  messageId: '',
  docType: ''
})

module.exports = {channel, connector, workflow, interactions}
