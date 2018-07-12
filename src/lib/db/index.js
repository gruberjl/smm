const channels = require('./channels')
const interactions = require('./interactions')
const workspace = require('./workspace')

const start = (store) => {
  workspace.start(store)
  interactions.start(store)
  channels.start(store)
}

module.exports = {start}
