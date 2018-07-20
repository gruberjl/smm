const uuid = require('uuid/v4')
const {put, createDb} = require('../../database/server')

const create = async (req, res, next) => {
  req.data.dbName = `channel-${uuid()}`
  await createDb(req.data.dbName, 'channel')
  res.data = await put(req.workspace.dbName, req.data)
  next()
}

const update = async (req, res, next) => {
  res.data = await put(req.workspace.dbName, req.data)
  next()
}

module.exports = {create, update}
