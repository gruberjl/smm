const {id, name} = require('./properties')

const schema = {
  title: 'connector',
  type: ['object', 'null'],
  properties: {
    id,
    name,
    image: {
      type:'string',
      format:'url'
    },
    account: id,
    provider: {
      type: 'string',
      enum: ['twitter'],
    },
    accountName: {
      type: 'string'
    }
  },
  required: ['id'],
  additionalProperties: false
}

module.exports = schema
