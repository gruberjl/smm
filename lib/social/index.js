const {getData} = require('./get-data.js')
const {writeData} = require('./write-data.js')
// const debug = require('debug')('social')
const workspaces = require('./workspaces')

const startGetDataLoop = () => {
  setInterval(() => {
    workspaces.get().forEach(workspace => {
      getData(workspace)
        .then(messages => {
          writeData(workspace, messages)
        })
    })
  }, 15000)
}

// const start2 = () => {
//   debug('starting social')
//   getWorkspace('workspace1')
//     .then(workspace => {
//       debug('retrieved workspace1')
//       if (workspace.error) {
//         debug('Errors were found in workspace1')
//         debug('%O', workspace.error)
//       } else {
//         createCache(workspace)
//         debug('workspace1 was successfully retrieved. Adding to workspaces.')
//         workspaces.push(workspace)
//         return workspace
//       }
//     })
//
//   startGetDataLoop()
// }

const start = async () => {
  const db = require('../database')
  const workspaceDocs = await db.allDocs('workspaces')
  workspaceDocs.forEach((workspaceDoc) =>
    workspaces.add(workspaceDoc)
  )
}

start()
startGetDataLoop()
