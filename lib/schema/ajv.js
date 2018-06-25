const AJV = require('ajv')
const glob = require('glob')
const {join} = require('path')

const ajv = new AJV({allErrors: true})

const formats = glob.sync(join(__dirname, 'formats', '*.format.js'))
formats.forEach((formatPath) => {
  const {name, validator} = require(formatPath)
  ajv.addFormat(name, validator)
})

const schemas = glob.sync(join(__dirname, '*.schema.js'))
schemas.forEach((schemaPath) => {
  const schema = require(schemaPath)
  ajv.addSchema(schema, schema.title)
})

module.exports = {ajv}
