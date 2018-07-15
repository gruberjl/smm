const Client = require('./client')

const post = (accessToken, tokenSecret, message) => new Promise(res => {
  const client = Client.create(accessToken, tokenSecret)
  client.post('statuses/update', {status: message})
    .then(raw => {
      res({status:200, id:raw.id_str, raw})
    })
    .catch(raw => {
      console.log(raw)
      res({error:{raw}})
    })
})

const unpost = async (accessToken, tokenSecret, id) => new Promise(res => {
  const client = Client.create(accessToken, tokenSecret)
  client.post('statuses/destroy', {id})
    .then(raw => {
      res({status:200, id:raw.id_str, raw})
    })
    .catch(raw => {
      console.log(raw)
      res({error:{raw}})
    })

})

module.exports = {post, unpost}
