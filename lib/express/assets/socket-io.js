/* eslint no-undef: 0 */

const socket = io()

const setWorkspace = (workspace) => {
  window.workspace = workspace
}

socket.on('tweet', (msg) => {
  console.log(msg)
})

socket.on('workspace', (workspace) => {
  setWorkspace(workspace)
})
