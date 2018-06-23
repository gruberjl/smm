const passport = require('passport')
const TwitterStrategy = require('passport-twitter').Strategy
const secret = require('../../../secret.js')

passport.use(new TwitterStrategy({
  consumerKey: secret.twitterApiKey,
  consumerSecret: secret.twitterApiSecret,
  callbackURL: 'http://localhost:3000/auth/twitter/callback'
},
(token, tokenSecret, profile, done) => {
  console.info('twitter authed')
  console.info(token)
  console.info(tokenSecret)
  console.info(profile)
  console.info('')
  done()
}
))
