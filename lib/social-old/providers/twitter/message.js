const tweetsToMessages = (tweets) => {
  const messages = tweets.map(tweet => ({
    _id: `twitter:${tweet.id_str}`,
    provider:'twitter',
    raw: tweet,
    from: {
      displayName: tweet.user.name,
      account: tweet.user.screen_name,
      image: tweet.user.profile_image_url_https,
      description: tweet.user.description,
      url: tweet.user.url,
      followersCount: tweet.user.followers_count,
      isVerified: tweet.user.verified
    },
    parent: tweet.in_reply_to_status_id_str,
    isReply: Boolean(tweet.in_reply_to_status_id_str),
    isOriginal: !tweet.retweeted_status,
    message: tweet.text,
    time: tweet.created_at
  }))

  return messages
}

const setWorkflow = (connector, messages) => {
  return messages
}

module.exports = {tweetsToMessages, setWorkflow}
