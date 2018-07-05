const {applyMiddleware} = require('redux')
const {channelDbsMiddleware} = require('./channel-dbs.middleware')

const createMiddleware = () => applyMiddleware(
  channelDbsMiddleware
)

module.exports = {createMiddleware}
