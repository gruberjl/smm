const {applyMiddleware} = require('redux')
const {workspaceMiddleware} = require('./workspace-middleware')
const {channelMiddleware} = require('./channel-middleware')

const createMiddleware = () => applyMiddleware(
  workspaceMiddleware,
  channelMiddleware
)

module.exports = {createMiddleware}
