
const handleParams = (req, res, next) => {
  req.query = req.params
  req.data = req.body
  next()
}

module.exports = {handleParams}
