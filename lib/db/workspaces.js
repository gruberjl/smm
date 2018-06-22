const flatten = require('flat')
const response = require('./responses')
const {redis} = require('./redis.js')

const create = (data) => {
  const flat = flatten(data)
  return redis.hmset(data.id, flat)
    .then(response.success)
}

const get = (id) => {
  return redis.hgetall(id)
    .then(response.success)
}

/* TODO
  I need to delete any links / references to the item before it's removed.
  For example: I need to update any workflows prior to removing a connector.
*/
const deleteField = (pipeline, id, flattened) => {
  const pattern = Object.keys(flattened)
    .filter((key) => flattened[key] == null)
    .reduce((acc, val, idx, arr) => {
      acc += arr.length-1==idx ? val : `${val}|`
      return acc
    }, '')

  if (pattern == '')
    return Promise.resolve()

  return redis.hgetall(id)
    .then((current) => {
      const regex = new RegExp(`^(${pattern})\\..*`, 'g')
      const keysToDelete = Object.keys(current)
        .filter((key) => key.match(regex))

      pipeline.hdel(id, keysToDelete)
    })
}

const update = (id, data) => {
  const flattened = flatten(data)
  const pipeline = redis.pipeline()

  return deleteField(pipeline, id, flattened)
    .then(() => {
      const sets = Object.keys(flattened).reduce((acc, key) => {
        if (flattened[key] != null) acc[key] = flattened[key]
        return acc
      }, {})

      if (Object.keys(sets).length > 0)
        pipeline.hmset(id, sets)

      pipeline.hgetall(id)

      return pipeline.exec()
        .then(response.pipeline)
    })

}

module.exports = {create, get, update}
