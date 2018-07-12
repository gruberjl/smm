const {watchDb} = require('../database')

const interactionMiddleware = store => {
  const emitter = watchDb('interactions1')

  emitter.on('change', docs => {
    const action = {type:'INTERACTION_CHANGE', docs}
    store.dispatch(action)
  })

  return next => action => next(action)
}

module.exports = {interactionMiddleware}
