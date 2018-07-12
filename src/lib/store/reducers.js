const {combineReducers} = require('redux')
const {workspace} = require('./workspace-reducer.js')
const {interactions} = require('./interactions-reducer.js')
const {channel} = require('./channel-reducer.js')

const reducers = combineReducers({workspace, interactions, channel})

module.exports = {reducers}
