const {watchDb} = require('../database')

const start = (store) => {
  const emitter = watchDb('interactions1')

  emitter.on('change', docs => {
    const action = {type:'INTERACTION_CHANGE', docs}
    store.dispatch(action)
  })
}

module.exports = {start}
