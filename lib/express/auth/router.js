const express = require('express')
const router = express.Router()
const passport = require('passport')

router.get('/twitter', (req, res, next) => {
  req.query1='asdf'
  next()
}, passport.authenticate('twitter'))

router.get('/twitter/callback',
  passport.authenticate('twitter', { successRedirect: '/', failureRedirect: '/login' })
)

module.exports = {router}
