const {unflatten} = require('flat')

const success = (raw) => {
  if (raw == 'OK')
    return {statusCode:200, raw}
  else if (raw !== null && typeof raw === 'object')
    return {statusCode:200, data:unflatten(raw), raw}
  else
    throw `unknown response ${JSON.stringify(raw)}`
}

const pipeline = (raw) => {
  let errors = ''
  raw.forEach((response) => {
    if (response[0] != null)
      errors += `${response[0]}; `
  })

  const data = unflatten(raw[raw.length-1][1])

  if (errors == '')
    return {statusCode:200, data, raw}
}

module.exports = {success, pipeline}
