const tweetsToMessages = (tweets, workflow) => {
  const messages = tweets.map(tweet => ({
    _id: `twitter:${tweet.id_str}`,
    provider:'twitter',
    providerId: tweet.id_str,
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
    message: tweet.full_text ?
      tweet.full_text :
      tweet.extended_tweet && tweet.extended_tweet.full_text ?
        tweet.extended_tweet.full_text :
        tweet.text,
    time: tweet.created_at,
    shareCount: tweet.retweet_count,
    favoriteCount: tweet.favorite_count,
    favorited: tweet.favorited,
    shared: tweet.retweeted,
    workflow,
    raw: tweet,
  }))

  return messages
}

module.exports = {tweetsToMessages}
