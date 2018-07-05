const channelDbsMiddleware = store => next => action => {
  if (action.type == 'CHANNELS_DB_ADD_MESSAGES') {
    const workflows = store.getState().workspace.workflows
    action.docs.forEach(doc => {
      doc.workflow = workflows.find(workflow => workflow._id == doc.workflow._id)
    })
  }

  return next(action)
}

module.exports = {channelDbsMiddleware}
