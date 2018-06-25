
const handleParams = (req, res, next) => {
  req.inquiry = req.params
  const paramsToData = {}
  if (req.params.id) paramsToData.id = req.params.id
  req.data = Object.assign({}, req.body, paramsToData)
  next()
}

module.exports = {handleParams}
