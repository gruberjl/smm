const workspace = (oldState={docs:[], channels:[], workflows:[], connectors:[], loaded:false}, action) => {
  if (action.type=='WORKSPACE_CHANGE') {
    const docs = action.docs
    const channels = docs.filter((doc) => doc.docType=='channel')
    const workflows = docs.filter((doc) => doc.docType=='workflow')
    const connectors = docs.filter((doc) => doc.docType=='connector')
    const state = {docs, channels, workflows, connectors, loaded:true}
    return state
  }

  return oldState
}

module.exports = {workspace}
