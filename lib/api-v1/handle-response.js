const {unflatten} = require('flat')

const getData = (raw) => {
  const data = unflatten(raw[raw.length-1][1])
  return data
}

const parseResponse = (req, res, next) => {
  let errors = ''
  const raw = req.db.raw
  raw.forEach((response) => {
    if (response[0] != null)
      errors += `${response[0]}; `
  })

  req.data = getData(raw)

  if (errors == '') {
    req.errors = errors
  }

  next()
}

const handleResponse = (req, res) => {
  let errors = ''
  const raw = req.db.raw
  raw.forEach((response) => {
    if (response[0] != null)
      errors += `${response[0]}; `
  })

  const data = getData(raw)

  if (errors == '') {
    res.status(200).json(data)
  }
}

module.exports = {handleResponse, getData, parseResponse}
