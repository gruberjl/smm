const flatten = require('flat')
const {unflatten} = flatten
const response = require('./responses')
const {redis} = require('./redis.js')
const {redisSocket} = require('./redis-socket.js')
const {getData} = require('../api-v1/handle-reponse.js')

const create = (data) => {
  const flat = flatten(data)
  return redis.hmset(data.id, flat)
    .then(response.success)
}

const read = (id) => redis.hgetall(id).then((raw) => unflatten(raw))

const get = (req, res, next) => {
  const pipeline = redis.pipeline()
  pipeline.hgetall(req.params.id)

  return pipeline.exec()
    .then((raw) => {req.db = {raw}})
    .finally(next)
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

const update = (req, res, next) => {
  const flattened = flatten(req.body)
  const pipeline = redis.pipeline()

  return deleteField(pipeline, req.params.id, flattened)
    .then(() => {
      const sets = Object.keys(flattened).reduce((acc, key) => {
        if (flattened[key] != null) acc[key] = flattened[key]
        return acc
      }, {})

      if (Object.keys(sets).length > 0)
        pipeline.hmset(req.params.id, sets)

      pipeline.hgetall(req.params.id)

      return pipeline.exec()
        .then((raw) => {req.db = {raw}})
        .then(() => {
          const data = getData(req.db.raw)
          redisSocket.publish('WORKSPACE_UPDATED', data)
        })
        .finally(next)
    })

}

module.exports = {create, read, get, update}
