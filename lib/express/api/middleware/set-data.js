const setData = (req, res, next) => {
  req.data = Object.assign({}, req.body)
  next()
}

module.exports = {setData}
