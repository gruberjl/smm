const {applyMiddleware} = require('redux')
const {workspaceMiddleware} = require('./workspace-middleware')
const {interactionsMiddleware} = require('./interactions-middleware')
const {channelMiddleware} = require('./channel-middleware')

const createMiddleware = () => applyMiddleware(
  workspaceMiddleware,
  interactionsMiddleware,
  channelMiddleware
)

module.exports = {createMiddleware}
