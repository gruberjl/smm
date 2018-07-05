const interfacesDb = (oldState={docs:[]}, action) => {
  if (action.type=='SET_INTERFACES') {
    const state = {docs: action.docs}
    return state
  }

  return oldState
}

module.exports = {interfacesDb}
