const {watchDocs, get, put} = require('../../database/server')
const twitter = require('./twitter')
const {updateMessages} = require('./update-messages')

const filterReadyToSubmit = (docs) => docs.filter(doc =>
  !doc.submitted
)

const fillInteraction = async (doc) => {
  const interaction = Object.assign({}, doc)
  interaction.connector = await get('workspace1', interaction.connector._id)
  interaction.connector.account = await get('accounts', interaction.connector.account)
  return interaction
}

watchDocs('interactions1').on('diff', (docs) => {
  const readyToSubmit = filterReadyToSubmit(docs)
  readyToSubmit.forEach(async doc => {
    const interaction = await fillInteraction(doc)
    if (doc.provider == 'twitter') {
      const response = await twitter.submit(interaction)
      if (response.ok) {
        doc.submitted = true
        put('interactions1', doc)
        updateMessages(interaction)
      }
    }
  })
})
