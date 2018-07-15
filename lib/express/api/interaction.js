const {put} = require('../../database/server')

const create = async (req, res, next) => {
  res.data = await put(req.interactionsDbName.dbName, req.data)
  next()
}

module.exports = {create}
