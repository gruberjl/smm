const flatten = require('flat')
const response = require('./responses')
const {redis} = require('./redis.js')

const create = (data) => {
  const flat = flatten(data)
  return redis.hmset(data.id, flat)
    .then(response.success)
}

module.exports = {create}
