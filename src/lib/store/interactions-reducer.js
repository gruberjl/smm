const interactions = (oldState={docs:[]}, action) => {
  if (action.type=='INTERACTIONS_CHANGE') {
    const state = Object.assign({}, oldState)
    state.docs = [].concat(state.docs, action.docs)
    return state
  }

  return oldState
}

module.exports = {interactions}
