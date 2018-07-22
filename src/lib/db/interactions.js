const {watchDb} = require('../database')

const start = (store) => {
  const emitter = watchDb('interactions1')

  emitter.on('change', docs => {
    const action = {type:'INTERACTIONS_CHANGE', docs}
    store.dispatch(action)
  })

  emitter.on('diff', docs => {
    const action = {type:'INTERACTIONS_DIFF', docs}
    store.dispatch(action)
  })
}

module.exports = {start}
