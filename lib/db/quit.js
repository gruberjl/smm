const {redis} = require('./redis.js')
const {redisSocketPub, redisSocketSub} = require('./redis-socket.js')

const all = () => {
  if (redis) redis.quit()
  if (redisSocketPub) redisSocketPub.quit()
  if (redisSocketSub) redisSocketSub.quit()
}

process.on('exit', all)

module.exports = {all}
