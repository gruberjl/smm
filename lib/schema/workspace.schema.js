const {id} = require('./properties')
const channel = require('./channel.schema.js')
const connector = require('./connector.schema.js')
const workflow = require('./workflow.schema.js')

const schema = {
  title: 'workspace',
  type: 'object',
  properties: {
    id,
    channels: {
      type: 'object',
      additionalProperties: channel
    },
    connectors: {
      type: 'object',
      additionalProperties: connector
    },
    workflows: {
      type: 'object',
      additionalProperties: workflow
    }
  },
  required: ['id'],
  additionalProperties: false
}

module.exports = schema
