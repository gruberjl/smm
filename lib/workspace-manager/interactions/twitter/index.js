const Twitter = require('twitter')
const secret = require('../../../../secret.js')

const submit = interaction => {
  const client = new Twitter({
    consumer_key: secret.twitterApiKey,
    consumer_secret: secret.twitterApiSecret,
    access_token_key: interaction.connector.account.token,
    access_token_secret: interaction.connector.account.tokenSecret
  })

  console.log(interaction.connector)
  console.log(interaction.connector.account.tokenSecret)

  return client.post('/favorites/create', {id: interaction.providerId})
    .then(() => {
      return {ok:true}
    })
    .catch(err => {
      if (err.length==1 && err[0].code == 139)
        return {ok:true}

      console.log(err)
      return {error:{raw:err}}
    })
}

module.exports = {submit}
