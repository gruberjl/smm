const {createQueryFromWorkflow, search, tweetsToMessages} = require('../provider/twitter/search')

const getTwitterSearchMessages = async (workflow, accessToken, tokenSecret) => {
  const query = createQueryFromWorkflow(workflow)
  let messages = []
  let idx = 0
  let done = false

  while (!done) {
    const tweets = await search(accessToken, tokenSecret, query)
    if (tweets.length > 0) {
      messages = messages.concat(tweetsToMessages(tweets, {_id: workflow._id}))
      query.max_id = messages[messages.length-1].providerId
    }

    idx++
    if (idx==10 || messages.length>250 || tweets.length==0) done=true
  }

  return messages
}

module.exports = {getTwitterSearchMessages}
