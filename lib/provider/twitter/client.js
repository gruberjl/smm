const Twitter = require('twitter')
const secret = require('../../../secret')
const consumer_key = secret.twitterApiKey
const consumer_secret = secret.twitterApiSecret

const create = (access_token_key, access_token_secret) =>
  new Twitter({consumer_key, consumer_secret, access_token_key, access_token_secret})

module.exports = {create}
