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

const createStream = (connection) => {
  const client = connection.twitter.client
  const socket = connection.socket

  const stream = client.stream('statuses/filter', {track: 'office365'})

  stream.on('data', (event) => {
    socket.emit('tweet', event)
  })

  stream.on('error', (error) => {
    throw error
  })

  connection.twitter.streams.push({stream})
}



module.exports = {connect, createStream}
