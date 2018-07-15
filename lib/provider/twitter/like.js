const Client = require('./client')

const like = (accessToken, tokenSecret, id, include_entities=true) => new Promise(res => {
  const client = Client.create(accessToken, tokenSecret)
  client.post('favorites/create', {id, include_entities})
    .then(raw => {
      res({status:200, id:raw.id_str, raw})
    })
    .catch(raw => {
      console.log(raw)
      res({error:{raw}})
    })
})

const unlike = async (accessToken, tokenSecret, id, include_entities=true) => new Promise(res => {
  const client = Client.create(accessToken, tokenSecret)
  client.post('favorites/destroy', {id, include_entities})
    .then(raw => {
      res({status:200, id:raw.id_str, raw})
    })
    .catch(raw => {
      console.log(raw)
      res({error:{raw}})
    })

})

module.exports = {like, unlike}
