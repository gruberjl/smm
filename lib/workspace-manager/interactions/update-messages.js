const {get, put, allDocs} = require('../../database/server')
const debug = require('debug')('workspace-manager:interactions:update-messages')

const interactionTypeToMessageAction = new Map([
  ['like', 'liked'],
  ['share', 'shared']
])

const updateMessage = (interaction) => async (channel) => {
  const message = await get(channel.dbName, interaction.messageId)

  if (message.error) {
    debug('error getting message: %O', message.error)
    return
  }

  debug('\nMessage:%O', message)
  const actionType = interactionTypeToMessageAction.get(interaction.docType)
  debug('\nactionType:%O', actionType)
  const actions = message[actionType]
  debug('\nactions:%O', actions)
  const i = actions.find(connector => connector._id == interaction.connector._id)
  debug('\ni:%O', i)

  if (i) {
    debug('connector %i already marked in %s for message %i in %s', interaction.connector._id, actionType, interaction.messageId, channel.dbName)
    return
  }

  debug('Updating message:\n%O\n', message)

  message[actionType].push({_id: interaction.connector._id})
  const results = await put(channel.dbName, message)
  debug('results:\n%O\n', results)
  if (results.error) {
    debug('error putting message: %O', results.error)
  }
}

const updateMessages = async (interaction) => {
  const workspace = await allDocs('workspace1')
  if (workspace.error) {
    debug('error getting workspace in updateMessages: %O', workspace.error)
    const response = []
    response.error = workspace.error
    return response
  }

  const channels = workspace.filter(doc => doc.docType == 'channel' && doc.dbName)
  const promises = channels.map(updateMessage(interaction))

  return Promise.all(promises)
}

module.exports = {updateMessages}
