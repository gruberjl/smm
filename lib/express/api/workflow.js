const {put} = require('../../database/server')
const {replaceMessages} = require('../../backfill')

const create = async (req, res, next) => {
  res.data = await put(req.workspace.dbName, req.data)
  await replaceMessages(req.workspace.dbName, res.data)
  next()
}

const update = async (req, res, next) => {
  res.data = await put(req.workspace.dbName, req.data)
  await replaceMessages(req.workspace.dbName, res.data)
  next()
}

module.exports = {create, update}
