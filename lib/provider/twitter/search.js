const Client = require('./client')

const search = (accessToken, tokenSecret, query) => new Promise(res => {
  const client = Client.create(accessToken, tokenSecret)
  client.get('search/tweets', query)
    .then(response => {
      response.statuses.status = 200
      res(response.statuses)
    })
    .catch(raw => {
      const response = []
      response.error = {raw}
      res(response)
    })
})

const createQueryFromWorkflow = (workflow, since_id, max_id) => {
  const f = workflow.filters
  const query = {tweet_mode:'extended', count:100}
  if (   f.language   ) query.lang = f.language
  if (    f.search    ) query.q = f.search
  if (  f.resultType  ) query.result_type = f.resultType
  if (!f.includeShares) query.q = `${query.q} -filter:retweets`
  if (since_id) query.since_id = since_id
  if (max_id) query.max_id = max_id
  return query
}

module.exports = {search, createQueryFromWorkflow}
