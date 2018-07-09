const {watchDb} = require('../database')

const workspaceMiddleware = store => {
  const emitter = watchDb('workspace1')

  emitter.on('change', docs => {
    const action = {type:'WORKSPACE_CHANGE', docs}
    store.dispatch(action)
  })

  return next => action => next(action)
}

module.exports = {workspaceMiddleware}
