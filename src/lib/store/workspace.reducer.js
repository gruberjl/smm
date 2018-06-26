const workspace = (oldState, filter) => {
  let state = Object.assign({}, oldState)

  if (typeof oldState === 'undefined') {
    state = window.intitalWorkspace
  }

  console.info(filter)
  return state
}

module.exports = {workspace}
