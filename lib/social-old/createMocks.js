const fs = require('fs')
const {join} = require('path')
const {setupWorkspace} = require('./workspace.js')

const start = () => {
  setupWorkspace('workspace1').then(workspace => {
    // console.log(workspace)
    fs.writeFileSync(join(__dirname, './workspace.mock.js'), JSON.stringify(workspace, null, 2))
  })
}

start()
