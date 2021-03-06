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
    const query = {tweet_mode:'extended', count:100}
    if (filters.language) query.lang = filters.language
    if (filters.search) query.q = filters.search
    if (filters.resultType) query.result_type = filters.resultType
    if (!filters.includeShares) query.q = `${query.q} -filter:retweets`
    query.count = 100

    const cache = {
      _id: workflow._id,
      name: workflow.name,
      query,
      nextRun: 0,
      filter: {}
    }

    if (filters.fromPopularity)
      cache.filter.fromPopularity = filters.fromPopularity

    return cache
  })

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

const filterMessages = (workflow, messages) => {
  if (!workflow.filter.fromPopularity) {
    debug(`skipping filterMessages for ${workflow.name} workflow.`)
    return messages
  }

  const filteredMessages = messages.filter(msg => {
    return msg.from.followersCount > workflow.filter.fromPopularity
  })
  debug('Filtered %i messages', messages.length - filteredMessages.length)
  return filteredMessages
}

const setSinceid = (workflow, messages) => {
  if (messages.length > 0) {
    const ids = messages.map(msg => msg.raw.id).sort().reverse()
    const since_id = ids[0]
    debug('setting since_id to %s', since_id)
    workflow.query.since_id = since_id
  }
}

const getDataForWorkflow = (workflow, client) =>
  client.get('search/tweets', workflow.query)
    .then(res => {
      debug(`found ${res.statuses.length} tweets for ${workflow.name} workflow`)
      return tweetsToMessages(res.statuses, {_id: workflow._id})
    })
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
        setSinceid(workflow, messages)
        return filterMessages(workflow, messages)
      })
  })

  const messages = Promise.all(calls)
    .then(messageArrays => messageArrays.reduce((acc, curr) => [].concat(acc, curr), []))

  return messages
}

module.exports = {createCache, getData}
