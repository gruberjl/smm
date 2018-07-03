const {getWorkspace} = require('./get-workspace.js')
const {createCache} = require('./create-cache.js')
const getData = require('./get-data.js')
const debug = require('debug')('social')
const workspaces = []

// const startGetDataLoop = () => {
//   setInterval(() => {
//     debug('getting data for %i workspaces', workspaces.length)
//   }, 15000)
// }

const start = () => {
  debug('starting social')
  getWorkspace('workspace1')
    .then(workspace => {
      debug('retrieved workspace1')
      if (workspace.error) {
        debug('Errors were found in workspace1')
        debug('%O', workspace.error)
      } else {
        debug('workspace1 was successfully retrieved. Adding to workspaces.')
        createCache(workspace)
        debug('%O', workspace)
        workspaces.push(workspace)
        return workspace
      }
    })
    .then(getData.forWorkspace)
    .then(messages => {
      const {join} = require('path')
      require('fs').writeFileSync(join(__dirname, 'messages.json'), JSON.stringify(messages, null, 2))
    })

  // startGetDataLoop()
}

start()
