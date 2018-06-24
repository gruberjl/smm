const passport = require('passport')
const TwitterStrategy = require('passport-twitter').Strategy
const secret = require('../../../secret.js')
const uuid = require('uuid/v4')

passport.use(new TwitterStrategy({
  consumerKey: secret.twitterApiKey,
  consumerSecret: secret.twitterApiSecret,
  callbackURL: 'http://localhost:3000/auth/twitter/callback',
  passReqToCallback : true
},
(req, token, tokenSecret, profile, done) => {
  let err
  console.log('callback')
  const account = uuid()
  req.data = {
    connectors: {
      id: uuid(),
      name: `twitter @${profile._json.screen_name}`,
      account: account,
      provider: 'twitter',
      accountName: profile._json.screen_name,
      image: profile._json.profile_image_url_https
    }
  }

  req.account = { id: account, token, tokenSecret }

  done(err, req.data)
}
))
