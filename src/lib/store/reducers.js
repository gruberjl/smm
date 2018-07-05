const {combineReducers} = require('redux')
const {workspace} = require('./workspace.reducer.js')
const {channelDbs} = require('./channelDbs.reducer.js')
const {interfacesDb} = require('./interfaces-db.reducer.js')

const reducers = combineReducers({workspace, channelDbs, interfacesDb})

module.exports = {reducers}
