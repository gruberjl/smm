const Twitter = require('twitter')
const secret = require('../../secret.js')

const connect = () => {
  const client = new Twitter({
    consumer_key: secret.twitterApiKey,
    consumer_secret: secret.twitterApiSecret,
    access_token_key: secret.twitterAccessToken,
    access_token_secret: secret.twitterTokenSecret
  })

  return client
}



module.exports = {connect}
