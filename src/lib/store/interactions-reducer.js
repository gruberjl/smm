const interactions = (oldState=[], action) => {
  if (action.type=='INTERACTIONS_CHANGE') {
    return action.docs
  }

  return oldState
}

module.exports = {interactions}
