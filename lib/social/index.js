const {setupWorkspace, closeWorkspace} = require('./workspace')
const workspaces = []

const start = () => {
  setupWorkspace('workspace1').then(workspace => {
    workspaces.push(workspace)
  })

  setInterval(() => {
    workspaces.forEach(workspace => {
      workspace.provider.getData()
    })
  }, 30000)
}

process.on('beforeExit', () => {
  workspaces.forEach(workspace => {
    closeWorkspace(workspace)
  })
})

start()
