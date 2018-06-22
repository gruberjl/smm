const {unflatten} = require('flat')

const handleResponse = (req, res) => {
  let errors = ''
  const raw = req.db.raw
  raw.forEach((response) => {
    if (response[0] != null)
      errors += `${response[0]}; `
  })

  const data = unflatten(raw[raw.length-1][1])

  if (errors == '') {
    res.status(200).json(data)
  }
}

module.exports = {handleResponse}
