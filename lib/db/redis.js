const Redis = require('ioredis')
const secret = require('../../secret.js')

let dbNum = 0
if (process.env.NODE_ENV.trim() == 'testing') dbNum = 1

const redis = new Redis({
  port: secret.redisPort,
  host: secret.redisServerIP,
  family: 4,
  db: dbNum
})

process.on('exit', () => {
  redis.close()
})

module.exports = {redis}
