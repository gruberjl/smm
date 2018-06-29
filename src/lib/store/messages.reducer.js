const messages = (oldState={all:[]}, action) => {
  const state = Object.assign({}, oldState)

  if (action.type=='NEW_MESSAGES') {
    const newMessages = action.data.messages.map(
      (message) => Object.assign({workflow: action.data.workflow}, message)
    )
    state.all = [].concat(oldState.all, newMessages)
  }

  return state
}

module.exports = {messages}
