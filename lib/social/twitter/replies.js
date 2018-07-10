const Twitter = require('twitter')
const {tweetsToMessages} = require('./message')
const {writeData} = require('../write-data')
const secret = require('../../../secret.js')
const debug = require('debug')('social:twitter:replies')
const debugErr = require('debug')('social:twitter:replies:errors')

const following = {}
const workflowMap = {}
const itemMap = {}
let messagesToSave = []
let stream

const client = new Twitter({
  consumer_key: secret.twitterApiKey,
  consumer_secret: secret.twitterApiSecret,
  access_token_key: secret.twitterAccessToken,
  access_token_secret: secret.twitterTokenSecret
})

const addFollowing = (messages) => {
  const userIds = messages.map(msg => msg.raw.user.id_str)
  userIds.forEach(userId => {
    following[userId] = ''
  })
}

const addWorkflowMap = (messages) => {
  messages.forEach(msg => {
    if (!workflowMap[msg.providerId]) workflowMap[msg.providerId] = []
    workflowMap[msg.providerId].push(msg.workflow._id)
  })
}

const addItemMap = (item, messages) => {
  messages.forEach(msg => {
    const workflowId = msg.workflow._id
    if (!itemMap[workflowId]) {
      itemMap[workflowId] = item
    }
  })
}

const handleTweet = (tweet) => {
  debug('handling tweet: id:%s parent:%s text:%s', tweet.id_str, tweet.in_reply_to_status_id_str, tweet.text)

  const parentId = tweet.in_reply_to_status_id_str
  if (parentId && !workflowMap[parentId]) return

  const workflowIds = workflowMap[parentId]

  workflowIds.forEach(workflowId => {
    const messages = tweetsToMessages([tweet], {_id:workflowId})
    messages.forEach(msg => {
      messagesToSave.push(msg)
    })
  })
}

const resetStream = () => {
  const follow = Object.keys(following).join(',')
  if (follow.length > 0) {
    debug('creating stream follow = %s', follow)
    if (stream) stream.destroy()
    client.stream('statuses/filter', {follow, tweet_mode:'extended'}, newStream => {
      stream = newStream
      stream.on('data', handleTweet)

      stream.on('error', function(error) {
        debugErr('%O', error)
      })
    })
  }
}

const saveMessages = () => {
  debug('Messages to Save: %O', messagesToSave)
  const itemsToSave = new Map()
  messagesToSave.forEach(msg => {
    const item = itemMap[msg.workflow._id]
    if (!itemsToSave.has(item)) itemsToSave.set(item, [])
    const msgsInItem = itemsToSave.get(item)
    msgsInItem.push(msg)
    itemsToSave.set(item, msgsInItem)
  })

  messagesToSave = []

  itemsToSave.forEach((item, messages) => {
    writeData(item, messages)
  })
}

const interval = setInterval(saveMessages, 30000)

const addMessages = (item, messages) => {
  debug('Adding %i messages', messages.length)
  addFollowing(messages)
  addWorkflowMap(messages)
  addItemMap(item, messages)
  debug('following %i people', Object.keys(following).length)
  debug('managing %i workflows', (new Set([].concat.apply([], Object.values(workflowMap)))).size)
  debug('managing %i items', Object.keys(itemMap).length)
  resetStream()
}

module.exports = {addMessages, interval}
