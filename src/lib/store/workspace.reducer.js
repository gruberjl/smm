const workspace = (oldState={docs:[], channels:[], workflows:[], connectors:[], loaded:false}, action) => {
  let docs

  if (action.type=='SET_WORKSPACE') {
    docs = action.docs
  }

  if (action.type=='WORKSPACE_UPDATED') {
    docs = [].concat(oldState.docs)

    const idx = oldState.docs.findIndex(doc => doc._id == action.doc._id)
    if (idx == -1) {
      docs.push(action.doc)
    } else if(action.doc._deleted) {
      docs.splice(idx, 1)
    } else {
      docs.splice(idx, 1, action.doc)
    }
  }

  if (docs) {
    const channels = docs.filter((doc) => doc.docType=='channel')
    const workflows = docs.filter((doc) => doc.docType=='workflow')
    const connectors = docs.filter((doc) => doc.docType=='connector')
    const state = {docs, channels, workflows, connectors, loaded:true}
    return state
  }

  return oldState
}

module.exports = {workspace}
