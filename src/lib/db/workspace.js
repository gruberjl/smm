const {watchDb} = require('../database')

let emitter

const start = (store) => {
  emitter = watchDb('workspace1')

  emitter.on('change', docs => {
    const action = {type:'WORKSPACE_CHANGE', docs}
    store.dispatch(action)
  })
}

const getEmitter = () => emitter

module.exports = {start, getEmitter}
