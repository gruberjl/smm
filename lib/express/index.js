const {resolve} = require('path')
const express = require('express')
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
const TwitterStrategy = require('passport-twitter').Strategy
const {facebookAppSecret, twitterApiKey, twitterApiSecret} = require(resolve(__dirname, '..', '..', 'secret.js'))

passport.use(
  new FacebookStrategy({
    clientID: 1798464146887606,
    clientSecret: facebookAppSecret,
    callbackURL: 'http://localhost:3000/auth/facebook/callback'
  },
  (accessToken, refreshToken, profile, done) => {
    console.log(`accessToken: ${accessToken}`)
    console.log(`refreshToken: ${refreshToken}`)
    console.log(`profile: ${profile}`)
    done(null)
  })
)

passport.use(new TwitterStrategy({
  consumerKey: twitterApiKey,
  consumerSecret: twitterApiSecret,
  callbackURL: 'http://localhost:3000/auth/twitter/callback'
},
(token, tokenSecret, profile, done) => {
  console.log(profile)
  console.log('')
  console.log(token)
  console.log(tokenSecret)
  done(null)
}
))

const app = express()

app.set('view engine', 'pug')
app.set('views', resolve(__dirname, 'views'))

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/connectors', (req, res) => {
  res.render('connectors/index')
})

app.get('/connectors/add', (req, res) => {
  res.render('connectors/add')
})

app.get('/app', (req, res) => {
  res.render('app/index')
})

app.get('/auth/facebook',
  passport.authenticate('facebook', { scope: ['public_profile', 'user_posts', 'manage_pages', 'publish_pages', 'pages_messaging' ] })
)
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login' })
)

app.get('/auth/twitter', passport.authenticate('twitter'))

app.get('/auth/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/')
  }
)

app.use('/assets', express.static(resolve(__dirname, 'assets')))

app.listen(3000, () => console.log('Example app listening on port 3000!'))
