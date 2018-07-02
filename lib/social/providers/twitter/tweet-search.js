const {tweetsToMessages} = require('./message')

const buildQuery = (connector) => {
  let query = ''

  if (connector.actions.tweet) {
    connector.actions.tweet.workflows.forEach(workflow => {
      query = query + workflow.doc.filters.search + ' '
    })
  }

  return query.trim()
}

const buildLanguageFilter = (connector) => {
  const language = new Set()

  if (connector.actions.tweet) {
    connector.actions.tweet.workflows.forEach(workflow => {
      if (workflow.doc.filters.language)
        language.add(workflow.doc.filters.language)
    })
  }

  if (language.size == 1) return Array.from(language)[0]

  return ''
}

const buildResultTypeFilter = (connector) => {
  const resultType = new Set()

  if (connector.actions.tweet) {
    connector.actions.tweet.workflows.forEach(workflow => {
      if (workflow.doc.filters.resultType)
        resultType.add(workflow.doc.filters.resultType)
    })
  }

  if (resultType.has('mixed')) return 'mixed'
  if (resultType.size > 1) return 'mixed'
  if (resultType.has('popular')) return 'popular'
  return 'recent'
}

const getData = (connector) => {
  const provider = connector.provider
  const {filter} = provider.tweetSearch

  return provider.client.get('search/tweets', filter).then(res => {
    const messages = tweetsToMessages(res.statuses)
    if (messages.length > 0)
      filter.since_id = messages[messages.length-1].raw.id_str
    return messages
  }).catch(err => console.log(err))
}

module.exports = {buildQuery, buildLanguageFilter, buildResultTypeFilter, getData}
