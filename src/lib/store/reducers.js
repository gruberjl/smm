const {combineReducers} = require('redux')
const {workspace} = require('./workspace.reducer.js')
const {messages} = require('./messages.reducer.js')

const reducers = combineReducers({workspace, messages})

module.exports = {reducers}
