const {combineReducers} = require('redux')
const {workspace} = require('./workspace.reducer.js')

const reducers = combineReducers({workspace})

module.exports = {reducers}
