const Twitter = require('twitter')
const secret = require('../../secret.js')

const connect = (token, tokenSecret) => {
  const client = new Twitter({
    consumer_key: secret.twitterApiKey,
    consumer_secret: secret.twitterApiSecret,
    access_token_key: token,
    access_token_secret: tokenSecret
  })

  return client
}

const searchTweets = (client, workflow, cb) => {
  const q = workflow.filters.hashtags.join(',')
  client.get('search/tweets', {q, count:25}, (error, tweets) => {
    const response = tweets.statuses.map((raw) => ({
      raw,
      from: {
        displayName: raw.user.name,
        account: raw.user.screen_name,
        image: raw.user.profile_image_url_https
      },
      message: raw.text,
      time: raw.created_at
    }))

    cb(response)
  })
}

const createStream = (client, workflow, cb) => {
  if (workflow.action == 'tweet') {
    const track = workflow.filters.hashtags.join(',')
    const stream = client.stream('statuses/filter', {track})

    stream.on('data', (raw) => {
      const response = {
        raw,
        from: {
          displayName: raw.user.name,
          account: raw.user.screen_name,
          image: raw.user.profile_image_url_https
        },
        message: raw.text,
        time: raw.created_at
      }
      cb(response)
    })

    stream.on('error', (err) => {
      // throw error
      console.error('stream error')
      console.dir(err)
    })

    workflow.stream = stream

    return workflow.stream
  }

  throw 'Bad workflow action'
}

const stopStream = (stream) => {
  stream.destroy()
}

module.exports = {connect, createStream, stopStream, searchTweets}
