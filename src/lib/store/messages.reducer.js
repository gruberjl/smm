const workspace = (oldState={}, action) => {
  let state = Object.assign({}, oldState)

  if (typeof oldState === 'undefined') {
    state = window.intitalWorkspace
  }

  if (action.type=='ws' && action.data.action=='WORKSPACE_UPDATED') {
    state = action.data.workspace
  }

  console.info(action)
  return state
}

module.exports = {workspace}
