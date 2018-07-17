const {TwitterSearchWorkflow} = require('./twitter-search-workflow')

const newWorkflow = (provider, workflow, accessToken, tokenSecret) => {
  if (provider == 'twitter' && workflow.action == 'search')
    return new TwitterSearchWorkflow(workflow, accessToken, tokenSecret)
}

module.exports = {newWorkflow}
