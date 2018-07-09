const {applyMiddleware} = require('redux')
const {channelDbsMiddleware} = require('./channel-dbs.middleware')
const {workspaceMiddleware} = require('./workspace-middleware')
const {channelMiddleware} = require('./channel-middleware')

const createMiddleware = () => applyMiddleware(
  channelDbsMiddleware,
  workspaceMiddleware,
  channelMiddleware
)

module.exports = {createMiddleware}
