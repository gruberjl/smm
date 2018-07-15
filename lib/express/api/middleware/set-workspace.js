const setWorkspace = (req, res, next) => {
  req.workspace = {dbName:'workspace1', interactionsDbName:'interactions1'}
  next()
}

module.exports = {setWorkspace}
