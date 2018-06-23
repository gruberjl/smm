const {redis} = require('./redis.js')
const {redisSocket} = require('./redis-socket.js')
const workspaces = require('./workspaces')
const quit = require('./quit.js')

module.exports = {redis, redisSocket, workspaces, quit}
