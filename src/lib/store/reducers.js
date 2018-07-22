const {combineReducers} = require('redux')
const {workspace} = require('./workspace-reducer.js')
const {interactions} = require('./interactions-reducer.js')
const {messages} = require('./message-reducer')

const reducers = combineReducers({workspace, interactions, messages})

module.exports = {reducers}
