const Client = require('./client')

const share = (accessToken, tokenSecret, id) => new Promise(res => {
  const client = Client.create(accessToken, tokenSecret)
  client.post('statuses/retweet', {id})
    .then(raw => {
      res({status:200, id:raw.id_str, raw})
    })
    .catch(raw => {
      console.log(raw)
      res({error:{raw}})
    })
})

const unshare = async (accessToken, tokenSecret, id) => new Promise(res => {
  const client = Client.create(accessToken, tokenSecret)
  client.post('statuses/unretweet', {id})
    .then(raw => {
      res({status:200, id:raw.id_str, raw})
    })
    .catch(raw => {
      console.log(raw)
      res({error:{raw}})
    })

})

module.exports = {share, unshare}
