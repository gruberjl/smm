const Client = require('./client')

const post = (accessToken, tokenSecret, message) => new Promise(res => {
  const client = Client.create(accessToken, tokenSecret)
  client.post('statuses/update', {status: message})
    .then(tRes => {
      res(tRes)
    })
    .catch(err => {
      console.log(err)
      res({error:{raw:err}})
    })
})

const unpost = async (accessToken, tokenSecret, id) => {
  const client = Client.create(accessToken, tokenSecret)
  const response = await client.post('statuses/destroy', {id})
  return response
}

module.exports = {post, unpost}
