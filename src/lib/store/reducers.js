const {combineReducers} = require('redux')
const {workspace} = require('./workspace.reducer.js')
const {channel} = require('./channel-reducer.js')
const {interfacesDb} = require('./interfaces-db.reducer.js')

const reducers = combineReducers({workspace, channel, interfacesDb})

module.exports = {reducers}
