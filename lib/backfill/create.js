const {bulkDocs} = require('../database/server')
const {getTwitterSearchMessages} = require('./get-twitter-search-messages')

const create = async (workflow, token, tokenSecret, channelDb) => {
  const messages = await getTwitterSearchMessages(workflow, token, tokenSecret)
  const results = await bulkDocs(channelDb, messages)
  return {results, messages}
}

module.exports = {create}
