const {tweetsToMessages} = require('./message')
const debug = require('debug')('social:twitter:search')

const getWorkflowsRequiringApiCalls = (connector, apiCallLimit) => {
  const now = (new Date()).getTime()

  const workflows = connector.actions.tweet.workflows
    .filter(workflow => workflow.nextRun < now)
    .sort((a, b) => {
      if (a.nextRun < b.nextRun) return -1
      if (a.nextRun == b.nextRun) return 0
      return 1
    })

  if (workflows.length > apiCallLimit)
    return workflows.slice(apiCallLimit-1)

  return workflows
}

const buildQuery = (filters) => {
  const query = {}
  if (filters.language) query.lang = filters.language
  if (filters.search) query.q = filters.search
  if (filters.resultType) query.result_type = filters.resultType
  if (!filters.includeShares) query.q = `${query.q} -filter:retweets`
  if (filters.since_id) query.since_id = filters.since_id

  return query
}

const resetCycle = (apiLimit, now) => {
  debug('checking apiLimit')
  if (apiLimit.cycleStart + apiLimit.cycleLength < now) {
    debug('Setting up new cycle')
    apiLimit.cycleStart = now
    apiLimit.callsThisCycle = 0
  } else {
    debug('Not configuring new cycle')
  }
}

const getDataForWorkflow = (workflow, client) => {
  debug('Getting data for workflow %s', workflow.doc.name)
  const now = (new Date()).getTime()
  workflow.nextRun = now + 60000
  debug('Setting workflows nextRun time to 1 minute')

  const query = buildQuery(workflow.doc.filters)
  debug('Configured query: %o', query)

  return client.get('search/tweets', query).then(res => {
    debug('Workflow %s Twitter search returned successfully', workflow.doc.name)
    debug('returned %i tweets', res.statuses.length)

    const now = (new Date()).getTime()
    workflow.nextRun = now + 30000
    debug('Setting nextRun time for 30 seconds')

    const messages = tweetsToMessages(res.statuses)
    messages.forEach(message => {
      message.workflow = {_id: workflow.doc._id}
    })

    if (messages.length > 0) {
      const since_id = messages[messages.length-1].raw.id_str
      debug('setting since_id to %s', since_id)
      workflow.doc.filters.since_id = since_id
    }


    return messages
  }).catch(error => {
    debug('Workflow %s Twitter search failed. returning []', workflow.doc.name)
    debug(error)
    return []
  })
}

const getData = (connector) => {
  debug('getData for %s', connector.doc.name)
  const {apiLimit} = connector.provider.tweetSearch
  const now = (new Date()).getTime()

  resetCycle(apiLimit, now)

  if (apiLimit.callsThisCycle >= apiLimit.callsPerCycle) {
    debug('Connector is over the API limit for this cycle %s', connector.doc.name)
    return Promise.resolve({messages:[]})
  }

  const apiCallLimit = apiLimit.callsPerCycle - apiLimit.callsThisCycle
  const waitingWorkflows = getWorkflowsRequiringApiCalls(connector, apiCallLimit)
  debug('Getting data from twitter for %i workflows', waitingWorkflows.length)

  apiLimit.callsThisCycle = apiLimit.callsThisCycle + waitingWorkflows.length
  debug('updated callsThisCycle to %i', apiLimit.callsThisCycle)

  const promises = waitingWorkflows.map(
    workflow => getDataForWorkflow(workflow, connector.provider.client)
  )

  return Promise.all(promises)
    .then(messageArrays => {
      debug('connector %s twitter searches have completed.', connector.doc.name)
      debug('%i workflows completed', messageArrays.length)
      const messages = messageArrays.reduce((acc, curr) => [].concat(acc, curr), [])
      debug('%i total messages returned', messages.length)
      return messages
    })
}

module.exports = {getData}
