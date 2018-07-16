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

module.exports = {search}
