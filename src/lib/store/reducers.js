const {combineReducers} = require('redux')
const {workspace} = require('./workspace.reducer.js')
const {channelDbs} = require('./channelDbs.reducer.js')

const reducers = combineReducers({workspace, channelDbs})

module.exports = {reducers}
