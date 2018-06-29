const workspace = (oldState, action) => {
  let state = Object.assign({}, oldState)

  if (typeof oldState === 'undefined') {
    state = window.intitalWorkspace
  }

  if (action.type=='ws' && action.action == 'WORKSPACE_UPDATED') {
    state = action.data.workspace
  }

  return state
}

module.exports = {workspace}
