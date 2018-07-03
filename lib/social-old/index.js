const {setupWorkspace} = require('./workspace')
const debug = require('debug')('social')
const providers = require('./providers')

const workspaces = []

const start = () => {
  debug('starting social server')

  setupWorkspace('workspace1').then(workspace => {
    debug('built workspace1: %O', workspace)
    workspaces.push(workspace)
  })

  setInterval(() => {
    debug('getting data for each workspace')
    workspaces.forEach(workspace => {
      debug('Getting data for %s', workspace.dbName)
      workspace.connectors.forEach(connector => {
        debug('Getting data for %s', connector.doc.name)
        providers.getData(connector)
      })
    })
  }, 30000)
}

start()
