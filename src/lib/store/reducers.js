const {combineReducers} = require('redux')
const {workspace} = require('./workspace-reducer.js')
const {channel} = require('./channel-reducer.js')

const reducers = combineReducers({workspace, channel})

module.exports = {reducers}
