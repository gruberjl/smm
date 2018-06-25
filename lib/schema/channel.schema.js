const {id, name} = require('./properties')

const schema = {
  title: 'channel',
  type: 'object',
  properties: {
    id,
    name
  },
  required: ['id'],
  additionalProperties: false
}

module.exports = schema
