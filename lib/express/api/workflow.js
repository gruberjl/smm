const {put} = require('../../database/server')

const create = async (req, res, next) => {
  res.data = await put(req.workspace.dbName, req.data)
  next()
}

module.exports = {create}
