const {tweetsToMessages} = require('./message')
const debug = require('debug')('social:twitter:search')

const createCache = (connector, workflows) => {
  const cache = {
    apiLimit: {
      callsPerCycle: 12,
      cycleStart: (new Date()).getTime(),
      cycleLength: 60000,
      callsLeftOnCycle: 12
    }
  }

  cache.workflows = workflows.map(workflow => {
    const {filters} = workflow
    const query = {tweet_mode:'extended'}
    if (filters.language) query.lang = filters.language
    if (filters.search) query.q = filters.search
    if (filters.resultType) query.result_type = filters.resultType
    if (!filters.includeShares) query.q = `${query.q} -filter:retweets`

    const cache = {
      _id: workflow._id,
      name: workflow.name,
      query,
      nextRun: 0
    }

    debug('search cache for %s workflow', workflow.name)
    debug('%O', cache)

    return cache
  })

  debug('search cache: %O', cache)

  return cache
}

const getWorkflowsRequiringApiCalls = (workflows, apiLimit) => {
  const now = (new Date()).getTime()

  const waitingWorkflows = workflows
    .filter(workflow => workflow.nextRun < now)
    .sort((a, b) => {
      if (a.nextRun < b.nextRun) return -1
      if (a.nextRun == b.nextRun) return 0
      return 1
    })

  if (waitingWorkflows.length > apiLimit.callsLeftOnCycle)
    return workflows.slice(apiLimit.callsLeftOnCycle-1)

  return workflows
}

const resetCycle = (apiLimit) => {
  const now = (new Date()).getTime()
  debug('checking apiLimit')
  if (apiLimit.cycleStart + apiLimit.cycleLength < now) {
    debug('Setting up new cycle')
    apiLimit.cycleStart = now
    apiLimit.callsLeftOnCycle = apiLimit.callsPerCycle
  } else {
    debug('Not configuring new cycle')
  }
}

const updateCallsLeftOnCycle = (apiLimit, workflows) => {
  apiLimit.callsLeftOnCycle = apiLimit.callsLeftOnCycle - workflows.length
}

const getDataForWorkflow = (workflow, client) =>
  client.get('search/tweets', workflow.query)
    .then(res => {
      debug(`found ${res.statuses.length} tweets for ${workflow.name} workflow`)
      return tweetsToMessages(res.statuses)
    })
    .then(messages =>
      messages.map(msg => {
        msg.workflow = {_id: workflow._id}
        return msg
      })
    )
    .catch(err => {
      debug('error getting data for %s workflow', workflow.name)
      debug('%O', err)
      return []
    })

const getData = (client, apiLimit, workflows) => {
  resetCycle(apiLimit)
  const waitingWorkflows = getWorkflowsRequiringApiCalls(workflows, apiLimit)

  if (waitingWorkflows.length == 0)
    return []

  updateCallsLeftOnCycle(apiLimit, waitingWorkflows)

  const calls = workflows.map(workflow => {
    debug('getting data for %s workflow', workflow.name)
    workflow.nextRun = (new Date()).getTime() + 60000
    return getDataForWorkflow(workflow, client)
      .then(messages => {
        debug(`${messages.length} messages received for %s workflow`, workflow.name)
        return messages
      })
  })

  const messages = Promise.all(calls)
    .then(messageArrays => messageArrays.reduce((acc, curr) => [].concat(acc, curr), []))

  return messages
}

module.exports = {createCache, getData}
