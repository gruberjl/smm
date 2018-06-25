const {id, name} = require('./properties')

const schema = {
  title: 'workflow',
  type: ['object', 'null'],
  properties: {
    id,
    name,
    action: {
      type: 'string',
      enum: ['tweet']
    },
    connector: id,
    channel: id,
    filters: {
      type: 'object',
      properties: {
        language: {
          type:'string',
          enum: ['en']
        },
        search: {
          type: 'string'
        },
        quality: {
          type: 'string',
          enum: ['none', 'low', 'medium']
        }
      }
    }
  },
  required: ['id'],
  additionalProperties: false
}

module.exports = schema
