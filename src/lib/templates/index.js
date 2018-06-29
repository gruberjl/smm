const uuid = require('uuid/v4')

const channel = () => ({
  _id: uuid(),
  docType: 'channel',
  name: ''
})

module.exports = {channel}
