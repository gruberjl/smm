const {ajv} = require('../schema')

const workspace = (req, res, next) => {
  console.info('Validing')
  console.info(req.data)
  const valid = ajv.validate('workspace', req.data)

  if (!valid) {
    res.status(422).json({rawErrors: ajv.errors})
  } else {
    next()
  }
}

module.exports = {workspace}
