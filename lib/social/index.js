const {getWorkspace} = require('./get-workspace.js')
const {createCache} = require('./create-cache.js')
const getData = require('./get-data.js')
const {writeData} = require('./write-data.js')
const debug = require('debug')('social')
const workspaces = []

const startGetDataLoop = () => {
  setInterval(() => {
    debug('getting data for %i workspaces', workspaces.length)
    workspaces.forEach(workspace => {
      getData.forWorkspace(workspace)
        .then(messages => {
          writeData(workspace, messages)
        })
    })
  }, 15000)
}

const start = () => {
  debug('starting social')
  getWorkspace('workspace1')
    .then(workspace => {
      debug('retrieved workspace1')
      if (workspace.error) {
        debug('Errors were found in workspace1')
        debug('%O', workspace.error)
      } else {
        createCache(workspace)
        debug('workspace1 was successfully retrieved. Adding to workspaces.')
        workspaces.push(workspace)
        return workspace
      }
    })

  startGetDataLoop()
}

start()
