const read = () => {
  const workspace = require('./data/workspace.json')
  return workspace
}

module.exports = {read}
